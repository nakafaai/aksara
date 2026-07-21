import { compileContent } from "@nakafaai/aksara-compiler/compile";
import { hashCompiledContentPayload } from "@nakafaai/aksara-contracts/artifact/verify";
import {
  type CompileDocumentSource,
  decodeCompileDocumentSource,
} from "@nakafaai/aksara-contracts/content";
import type { ContentReleaseItem } from "@nakafaai/aksara-contracts/release";
import type { VerifiedContentReleaseItems } from "@nakafaai/aksara-contracts/release/items";
import type { RendererManifestEnvelope } from "@nakafaai/aksara-contracts/renderer/contract";
import { Effect } from "effect";
import {
  ReleaseArtifactMismatchError,
  validateCompiledPayloadForItem,
  validateUpsertSourceCount,
} from "#publisher/release-validation.js";

function upsertItems(items: readonly ContentReleaseItem[]) {
  return items.filter((item) => item.change.operation === "upsert");
}

function validateSourceIdentity(
  item: ContentReleaseItem,
  source: CompileDocumentSource
) {
  const matches =
    item.change.operation === "upsert" &&
    item.change.contentKey === source.contentKey &&
    item.change.locale === source.locale;
  if (matches) {
    return Effect.void;
  }
  return Effect.fail(
    new ReleaseArtifactMismatchError({
      message: `Authored source does not match release item ${item.index}.`,
    })
  );
}

/**
 * Recompiles the exact authored sources and proves their canonical artifact
 * hashes before any production signing or publication IO can begin.
 */
export const compileReleaseSources = Effect.fn(
  "AksaraPublisher.compileReleaseSources"
)(function* (input: {
  readonly rendererManifest: RendererManifestEnvelope;
  readonly sources: readonly unknown[];
  readonly summary: VerifiedContentReleaseItems;
}) {
  yield* validateUpsertSourceCount(input.summary, input.sources.length);
  const items = upsertItems(input.summary.items);

  return yield* Effect.forEach(input.sources, (sourceInput, sourceIndex) =>
    Effect.gen(function* () {
      const item = items[sourceIndex];
      if (!item) {
        return yield* new ReleaseArtifactMismatchError({
          message: "An authored source has no authenticated upsert item.",
        });
      }
      const source = yield* decodeCompileDocumentSource(sourceInput);
      yield* validateSourceIdentity(item, source);
      const payload = yield* compileContent({
        ...source,
        rendererManifest: input.rendererManifest,
      });
      const artifactHash = hashCompiledContentPayload(payload);
      yield* validateCompiledPayloadForItem(item, artifactHash, payload);
      return payload;
    })
  );
});
