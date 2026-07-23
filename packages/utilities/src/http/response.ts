import type { HttpClientResponse } from "@effect/platform";
import { Chunk, Effect, Schema, Stream } from "effect";

interface BodyState {
  readonly chunks: Chunk.Chunk<Uint8Array>;
  readonly size: number;
}

const EMPTY_BODY: BodyState = {
  chunks: Chunk.empty(),
  size: 0,
};

/** A bounded HTTP response body could not be read safely. */
export class BodyError extends Schema.TaggedError<BodyError>()("BodyError", {
  reason: Schema.Literal("empty", "encoding", "length", "limit", "stream"),
}) {}

/** Checks a media type is exactly JSON while allowing parameters. */
export function isJsonType(value: string | undefined) {
  return value?.split(";", 1)[0]?.trim().toLowerCase() === "application/json";
}

/** Checks every required cache directive exists as an exact token. */
export function hasDirectives(
  value: string | undefined,
  required: readonly string[]
) {
  const directives = new Set(
    value?.split(",").map((directive) => directive.trim().toLowerCase()) ?? []
  );
  return required.every((directive) => directives.has(directive.toLowerCase()));
}

/** Checks an optional declared byte length fits one safe exact ceiling. */
function validLength(value: string | undefined, maximumBytes: number) {
  if (!Number.isSafeInteger(maximumBytes) || maximumBytes < 0) {
    return false;
  }
  if (value === undefined) {
    return true;
  }
  const bytes = Number(value);
  return Number.isSafeInteger(bytes) && bytes >= 0 && bytes <= maximumBytes;
}

/** Joins already-bounded response chunks without an intermediate string. */
function joinChunks(body: BodyState) {
  const bytes = new Uint8Array(body.size);
  let offset = 0;
  for (const chunk of body.chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes;
}

/** Reads strict UTF-8 response text without crossing the byte ceiling. */
export const readText = Effect.fn("AksaraUtilities.readText")(
  (response: HttpClientResponse.HttpClientResponse, maximumBytes: number) => {
    if (!validLength(response.headers["content-length"], maximumBytes)) {
      return Effect.fail(new BodyError({ reason: "length" }));
    }
    return response.stream.pipe(
      Stream.mapError(
        (error) =>
          new BodyError({
            reason: error.reason === "EmptyBody" ? "empty" : "stream",
          })
      ),
      Stream.runFoldEffect(EMPTY_BODY, (state, chunk) => {
        const size = state.size + chunk.byteLength;
        if (size > maximumBytes) {
          return Effect.fail(new BodyError({ reason: "limit" }));
        }
        return Effect.succeed({
          chunks: Chunk.append(state.chunks, chunk),
          size,
        });
      }),
      Effect.map(joinChunks),
      Effect.flatMap((bytes) =>
        Effect.try({
          catch: () => new BodyError({ reason: "encoding" }),
          try: () => new TextDecoder("utf-8", { fatal: true }).decode(bytes),
        })
      )
    );
  }
);
