import { compileContent } from "@nakafa/aksara-compiler/compile";
import { hashCompiledContentPayload } from "@nakafa/aksara-contracts/artifact/verify";
import {
  type CompileDocumentSource,
  type CompiledContentPayload,
  decodeCompileDocumentSource,
} from "@nakafa/aksara-contracts/content";
import type { ContentReleaseItem } from "@nakafa/aksara-contracts/release";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { Effect, Stream } from "effect";
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

/** One authenticated release item paired with its reproducible payload. */
export interface CompiledReleaseSource {
  readonly item: ContentReleaseItem;
  readonly payload: CompiledContentPayload;
}

/** Requires an authored source to match its authenticated release item. */
function validateSourceIdentity(
  item: ContentReleaseItem,
  source: CompileDocumentSource
) {
  const matches =
    item.change.operation === "upsert" &&
    item.change.contentKey === source.contentKey &&
    item.change.locale === source.locale &&
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
  return input.items.pipe(
    Stream.zipAllWith({
      onBoth: (item, source): SourcePair => ({ item, kind: "both", source }),
      onOther: (source): SourcePair => ({ kind: "extra-source", source }),
      onSelf: (item): SourcePair => ({ item, kind: "missing-source" }),
      other: input.sources,
    }),
    Stream.mapEffect((pair) => compileSource(input.rendererManifest, pair))
  );
}
