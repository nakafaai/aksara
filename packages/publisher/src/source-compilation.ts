import { compileContent } from "@nakafa/aksara-compiler/compile";
import { hashCompiledContentPayload } from "@nakafa/aksara-contracts/artifact/integrity";
import {
  type CompileDocumentSource,
  CompiledContentPayloadSchema,
  decodeCompileDocumentSource,
} from "@nakafa/aksara-contracts/content";
import {
  type ContentReleaseItem,
  ContentReleaseItemSchema,
} from "@nakafa/aksara-contracts/release";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { Effect, Option, Schema, Stream } from "effect";
import {
  ReleaseArtifactMismatchError,
  validateCompiledPayloadForItem,
} from "#publisher/release-validation";

type SourcePair =
  | {
      readonly item: ContentReleaseItem;
      readonly kind: "missing-source";
    }
  | {
      readonly kind: "extra-source";
      readonly source: unknown;
    }
  | {
      readonly item: ContentReleaseItem;
      readonly kind: "both";
      readonly source: unknown;
    };

/** Extends a finite stream with explicit absence for a constant-space full zip. */
function withTrailingAbsence<A, E, R>(stream: Stream.Stream<A, E, R>) {
  return stream.pipe(
    Stream.map(Option.some),
    Stream.concat(Stream.fromEffectRepeat(Effect.succeed(Option.none<A>())))
  );
}

/** Strict disk-replay contract for one exact-Git compilation result. */
export const CompiledReleaseSourceSchema = Schema.Struct({
  item: ContentReleaseItemSchema,
  payload: CompiledContentPayloadSchema,
});
/** One authenticated release item paired with its reproducible payload. */
export type CompiledReleaseSource = typeof CompiledReleaseSourceSchema.Type;

/** Requires an authored source to match its authenticated release item. */
function validateSourceIdentity(
  item: ContentReleaseItem,
  source: CompileDocumentSource
) {
  const matches =
    item.change.operation === "upsert" &&
    item.change.contentKey === source.contentKey &&
    item.change.artifactLocale === source.artifactLocale &&
    item.change.rendererDomain === source.rendererDomain &&
    item.change.sourcePath === source.sourcePath;
  if (matches) {
    return Effect.void;
  }
  return Effect.fail(
    new ReleaseArtifactMismatchError({
      message: `Authored source does not match release item ${item.index}.`,
    })
  );
}

/** Recompiles one paired source and proves its authenticated artifact hash. */
function compileSource(
  rendererManifest: RendererManifestEnvelope,
  pair: SourcePair
) {
  if (pair.kind === "missing-source") {
    return Effect.fail(
      new ReleaseArtifactMismatchError({
        message: `Release item ${pair.item.index} has no authored source.`,
      })
    );
  }
  if (pair.kind === "extra-source") {
    return Effect.fail(
      new ReleaseArtifactMismatchError({
        message: "An authored source has no authenticated upsert item.",
      })
    );
  }
  return Effect.gen(function* () {
    const source = yield* decodeCompileDocumentSource(pair.source);
    yield* validateSourceIdentity(pair.item, source);
    const { payload } = yield* compileContent({ ...source, rendererManifest });
    const artifactHash = hashCompiledContentPayload(payload);
    yield* validateCompiledPayloadForItem(pair.item, artifactHash, payload);
    return { item: pair.item, payload };
  });
}

/**
 * Compiles exact ordered sources once for the active staging invocation so
 * publication can sign and upload each artifact incrementally.
 */
export function compileReleaseSources<E, R, E2, R2>(input: {
  readonly items: Stream.Stream<ContentReleaseItem, E, R>;
  readonly rendererManifest: RendererManifestEnvelope;
  readonly sources: Stream.Stream<unknown, E2, R2>;
}) {
  return withTrailingAbsence(input.items).pipe(
    Stream.zip(withTrailingAbsence(input.sources)),
    Stream.map(([item, source]): SourcePair | undefined => {
      if (Option.isSome(item) && Option.isSome(source)) {
        return {
          item: item.value,
          kind: "both",
          source: source.value,
        };
      }
      if (Option.isSome(item)) {
        return {
          item: item.value,
          kind: "missing-source",
        };
      }
      if (Option.isSome(source)) {
        return {
          kind: "extra-source",
          source: source.value,
        };
      }
      return undefined;
    }),
    Stream.takeWhile((pair): pair is SourcePair => pair !== undefined),
    Stream.mapEffect((pair) => compileSource(input.rendererManifest, pair))
  );
}
