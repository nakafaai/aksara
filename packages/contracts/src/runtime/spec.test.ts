import { Effect, Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  ContentRuntimeRequestSchema,
  ContentRuntimeResponseSchema,
  decodeContentRuntimeRequest,
  decodeContentRuntimeResponse,
  MAX_RUNTIME_REQUEST_BYTES,
  MAX_RUNTIME_RESPONSE_BYTES,
  verifyContentRuntimeExchange,
} from "#contracts/runtime/spec";
import { artifact, hash, projection, releaseId } from "#contracts/test/request";

const request = {
  delivery: "public",
  locale: "en",
  publicPath: "subjects/test/transport",
};

const found = {
  activeManifestHash: hash,
  activeReleaseId: releaseId,
  artifact,
  delivery: "public",
  kind: "found",
  projection,
  projectionHash: hash,
  rendererContractVersion: "1.0.0",
};

/** Strictly tests one runtime contract without allowing extra properties. */
function accepts(schema: Schema.Schema.AnyNoContext, input: unknown) {
  return Either.isRight(
    Schema.decodeUnknownEither(schema)(input, { onExcessProperty: "error" })
  );
}

describe("content runtime contract", () => {
  it("decodes the exact bounded route request", async () => {
    expect(MAX_RUNTIME_REQUEST_BYTES).toBe(4096);
    expect(MAX_RUNTIME_RESPONSE_BYTES).toBe(1024 * 1024);
    expect(accepts(ContentRuntimeRequestSchema, request)).toBe(true);
    await expect(
      Effect.runPromise(decodeContentRuntimeRequest(request))
    ).resolves.toEqual(request);

    for (const invalid of [
      { ...request, delivery: "private" },
      { ...request, locale: "de" },
      { ...request, publicPath: "/subjects/test/transport" },
      { ...request, extra: true },
    ]) {
      expect(accepts(ContentRuntimeRequestSchema, invalid)).toBe(false);
    }
  });

  it("accepts found, missing, and sanitized failure responses", async () => {
    for (const response of [
      found,
      { kind: "missing" },
      { code: "CONTENT_RUNTIME_UNAUTHORIZED", kind: "failure" },
      { code: "CONTENT_RUNTIME_FORBIDDEN", kind: "failure" },
      { code: "CONTENT_RUNTIME_INVALID", kind: "failure" },
      { code: "CONTENT_RUNTIME_INTERNAL", kind: "failure" },
    ]) {
      expect(accepts(ContentRuntimeResponseSchema, response)).toBe(true);
    }
    await expect(
      Effect.runPromise(decodeContentRuntimeResponse(found))
    ).resolves.toEqual(found);
  });

  it("rejects mismatched identities and uncontracted response fields", () => {
    const mismatch = Schema.decodeUnknownEither(ContentRuntimeResponseSchema)({
      ...found,
      projection: { ...projection, contentKey: "test:other" },
    });
    expect(Either.isLeft(mismatch)).toBe(true);
    if (Either.isLeft(mismatch)) {
      expect(String(mismatch.left)).toContain(
        "Expected the runtime artifact and projection to share one identity."
      );
    }
    expect(
      accepts(ContentRuntimeResponseSchema, {
        ...found,
        artifact: {
          ...artifact,
          payload: { ...artifact.payload, locale: "id" },
        },
      })
    ).toBe(false);
    expect(
      accepts(ContentRuntimeResponseSchema, { kind: "missing", reason: "x" })
    ).toBe(false);
  });

  it("binds a found response to its exact request", async () => {
    await expect(
      Effect.runPromise(
        verifyContentRuntimeExchange({ request, response: found })
      )
    ).resolves.toEqual(found);
    const responses = [
      { ...found, delivery: "entitled" },
      {
        ...found,
        artifact: {
          ...artifact,
          payload: { ...artifact.payload, locale: "id" },
        },
        projection: { ...projection, locale: "id" },
      },
      {
        ...found,
        projection: { ...projection, publicPath: "subjects/test/other" },
      },
    ];
    const outcomes = await Promise.all(
      responses.map((response) =>
        Effect.runPromise(
          verifyContentRuntimeExchange({ request, response }).pipe(
            Effect.either
          )
        )
      )
    );
    expect(
      outcomes.map((outcome) =>
        Either.isLeft(outcome) &&
        outcome.left._tag === "ContentRuntimeMismatchError"
          ? outcome.left.reason
          : "none"
      )
    ).toEqual(["delivery", "locale", "publicPath"]);
  });

  it("preserves request-bound missing and failure responses", async () => {
    const responses = [
      { kind: "missing" },
      { code: "CONTENT_RUNTIME_FORBIDDEN", kind: "failure" },
    ];
    await Promise.all(
      responses.map((response) =>
        expect(
          Effect.runPromise(verifyContentRuntimeExchange({ request, response }))
        ).resolves.toEqual(response)
      )
    );
  });
});
