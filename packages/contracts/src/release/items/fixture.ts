import { Effect, Schema, Stream } from "effect";
import { ReleaseIdSchema } from "#contracts/ids";
import { digestItems } from "#contracts/release/digest";
import { verifyContentReleaseItems } from "#contracts/release/items";
import { inheritContentSnapshots } from "#contracts/release/snapshot/spec";
import {
  ContentChangeSchema,
  type ContentReleaseItem,
  ContentReleaseManifestSchema,
} from "#contracts/release/spec";
import { makeReleaseItems } from "#contracts/test/items";

const releaseId = Schema.decodeSync(ReleaseIdSchema)("test-release-items");

/** Builds one complete upsert change for item-integrity tests. */
export function upsertChange(
  contentKey: string,
  artifactLocale: string,
  delivery: string,
  hashCharacter: string
) {
  const slug = contentKey.replace(":", "/");
  return {
    artifactHash: `sha256:${hashCharacter.repeat(64)}`,
    artifactLocale,
    contentKey,
    delivery,
    family: "material",
    operation: "upsert",
    rendererDomain: "mathematics",
    sourcePath: `packages/corpus/${slug}/${artifactLocale}.mdx`,
  };
}

const changes = Schema.decodeUnknownSync(Schema.Array(ContentChangeSchema))([
  upsertChange("test:a", "en", "public", "a"),
  {
    artifactLocale: "id",
    contentKey: "test:b",
    family: "material",
    operation: "delete",
  },
]);

/** Canonical ordered release items shared by integrity assertions. */
export const items = makeReleaseItems(releaseId, changes);

/** Builds the signed manifest identity for the canonical item fixture. */
export const makeManifest = Effect.fn("AksaraContractsTest.makeItemManifest")(
  function* () {
    const itemSummary = yield* digestItems(
      releaseId,
      Stream.fromIterable(items)
    );
    return yield* Schema.decodeEffect(ContentReleaseManifestSchema)({
      activeAppLocales: ["en", "id"],
      baseActiveAppLocales: ["en", "id"],
      baseManifestHash: `sha256:${"d".repeat(64)}`,
      baseReleaseId: "test-release-parent",
      baseResultCount: 1,
      baseResultDigest: `sha256:${"e".repeat(64)}`,
      deleteCount: itemSummary.deleteCount,
      format: "localized-content-release",
      itemCount: items.length,
      itemsDigest: itemSummary.digest,
      origin: { kind: "git", sha: "a".repeat(40) },
      projectionCount: 1,
      projectionDigest: `sha256:${"b".repeat(64)}`,
      releaseId,
      rendererContractVersion: "1.0.0",
      rendererManifestHash: `sha256:${"c".repeat(64)}`,
      resultCount: 1,
      resultDigest: `sha256:${"f".repeat(64)}`,
      rollbackCount: items.length,
      rollbackDigest: `sha256:${"d".repeat(64)}`,
      routeCount: 0,
      routeDigest: `sha256:${"d".repeat(64)}`,
      scope: { families: ["material"], snapshots: [] },
      snapshots: inheritContentSnapshots(null),
      upsertCount: itemSummary.upsertCount,
    });
  }
);

/** Returns the expected typed failure for one candidate item sequence. */
export function reject(
  candidate: readonly unknown[],
  candidateManifest?: typeof ContentReleaseManifestSchema.Type
) {
  return Effect.gen(function* () {
    const manifest = candidateManifest ?? (yield* makeManifest());
    return yield* verifyContentReleaseItems({
      items: Stream.fromIterable(candidate),
      manifest,
    }).pipe(Effect.flip);
  });
}

/** Replaces one item without mutating the shared fixture stream. */
export function replaceItem(
  index: number,
  update: (item: ContentReleaseItem) => unknown
) {
  return items.map((item, itemIndex) =>
    itemIndex === index ? update(item) : item
  );
}

/** Creates a self-consistent candidate manifest and item collection. */
export const makeCandidate = Effect.fn("AksaraContractsTest.makeItemCandidate")(
  function* (candidateChanges: readonly unknown[]) {
    const manifest = yield* makeManifest();
    const decoded = yield* Schema.decodeUnknownEffect(
      Schema.Array(ContentChangeSchema)
    )(candidateChanges);
    const candidateItems = makeReleaseItems(manifest.releaseId, decoded);
    const summary = yield* digestItems(
      manifest.releaseId,
      Stream.fromIterable(candidateItems)
    );
    const candidateManifest = yield* Schema.decodeEffect(
      ContentReleaseManifestSchema
    )({
      ...manifest,
      deleteCount: summary.deleteCount,
      itemCount: candidateItems.length,
      itemsDigest: summary.digest,
      rollbackCount: candidateItems.length,
      scope: {
        families: ["material"],
        snapshots: manifest.scope.snapshots,
      },
      upsertCount: summary.upsertCount,
    });
    return { items: candidateItems, manifest: candidateManifest };
  }
);
