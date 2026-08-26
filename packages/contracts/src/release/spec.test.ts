import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Exit, Schema, Stream } from "effect";
import { ReleaseIdSchema } from "#contracts/ids";
import { AppLocaleSchema } from "#contracts/locale";
import { digestItems } from "#contracts/release/digest";
import { EMPTY_RESULT_CATALOG_DIGEST } from "#contracts/release/result/spec";
import {
  inheritContentSnapshots,
  invertContentSnapshots,
  replaceContentSnapshot,
  restoreContentSnapshot,
} from "#contracts/release/snapshot/spec";
import {
  ContentChangeSchema,
  ContentReleaseManifestSchema,
  RollbackSignedContentReleaseSchema,
  releaseActivatesAppLocale,
} from "#contracts/release/spec";
import { makeReleaseItems } from "#contracts/test/items";
import { release as gitRelease } from "#contracts/test/request";

const releaseId = Schema.decodeSync(ReleaseIdSchema)("test-release");

const changes = Schema.decodeSync(Schema.Array(ContentChangeSchema))([
  {
    artifactLocale: "id",
    contentKey: "test:content",
    family: "material",
    operation: "delete",
  },
  {
    artifactHash: `sha256:${"b".repeat(64)}`,
    artifactLocale: "en",
    contentKey: "test:content",
    delivery: "public",
    family: "material",
    operation: "upsert",
    rendererDomain: "mathematics",
    sourcePath: "packages/corpus/test/content/en.mdx",
  },
]);
const items = makeReleaseItems(releaseId, changes);
const itemSummary = await Effect.runPromise(
  digestItems(releaseId, Stream.fromIterable(items))
);
const manifest = Schema.decodeSync(ContentReleaseManifestSchema)({
  activeAppLocales: ["en", "id"],
  baseActiveAppLocales: null,
  baseManifestHash: null,
  baseReleaseId: null,
  baseResultCount: 0,
  baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
  deleteCount: itemSummary.deleteCount,
  format: "localized-content-release",
  itemCount: items.length,
  itemsDigest: itemSummary.digest,
  origin: { kind: "git", sha: "a".repeat(40) },
  projectionCount: 1,
  projectionDigest: `sha256:${"c".repeat(64)}`,
  releaseId,
  rendererContractVersion: "1.0.0",
  rendererManifestHash: `sha256:${"d".repeat(64)}`,
  resultCount: 1,
  resultDigest: `sha256:${"e".repeat(64)}`,
  rollbackCount: items.length,
  rollbackDigest: `sha256:${"f".repeat(64)}`,
  routeCount: 0,
  routeDigest: `sha256:${"f".repeat(64)}`,
  scope: {
    families: ["material"],
    snapshots: [],
  },
  snapshots: inheritContentSnapshots(null),
  upsertCount: itemSummary.upsertCount,
});

describe("release spec", () => {
  it("checks activation from the signed current locale set", () => {
    expect(
      releaseActivatesAppLocale(gitRelease, AppLocaleSchema.make("en"))
    ).toBe(true);
    expect(
      releaseActivatesAppLocale(gitRelease, AppLocaleSchema.make("de"))
    ).toBe(true);
  });

  it("rejects non-rollback envelopes at recovery boundaries", () => {
    const result = Schema.decodeExit(RollbackSignedContentReleaseSchema)(
      gitRelease
    );
    expect(Exit.isFailure(result) ? String(result.cause) : "").toContain(
      "Expected a signed rollback release."
    );
  });
  it("assigns deterministic indexes after content-head sorting", () => {
    expect(
      items.map(({ change, index }) => [
        change.contentKey,
        change.artifactLocale,
        index,
      ])
    ).toEqual([
      ["test:content", "en", 0],
      ["test:content", "id", 1],
    ]);
  });

  it("requires forward rollback provenance and permits rollback of rollback", async () => {
    const firstId = Schema.decodeSync(ReleaseIdSchema)("rollback-first");
    const firstItems = makeReleaseItems(firstId, []);
    const firstSummary = await Effect.runPromise(
      digestItems(firstId, Stream.fromIterable(firstItems))
    );
    const first = Schema.decodeSync(ContentReleaseManifestSchema)({
      ...manifest,
      baseActiveAppLocales: manifest.activeAppLocales,
      baseManifestHash: `sha256:${"1".repeat(64)}`,
      baseReleaseId: releaseId,
      baseResultCount: manifest.resultCount,
      baseResultDigest: manifest.resultDigest,
      deleteCount: 0,
      itemCount: 0,
      itemsDigest: firstSummary.digest,
      origin: { kind: "rollback", releaseId },
      projectionCount: 0,
      releaseId: firstId,
      rollbackCount: 0,
      snapshots: invertContentSnapshots(manifest.snapshots),
      upsertCount: 0,
    });
    const second = Schema.decodeExit(ContentReleaseManifestSchema)({
      ...first,
      baseActiveAppLocales: first.activeAppLocales,
      baseManifestHash: `sha256:${"2".repeat(64)}`,
      baseReleaseId: firstId,
      origin: { kind: "rollback", releaseId: firstId },
      releaseId: "rollback-second",
      snapshots: invertContentSnapshots(first.snapshots),
    });
    expect(Exit.isSuccess(second)).toBe(true);
    const gitRestore = Schema.decodeExit(ContentReleaseManifestSchema)({
      ...first,
      origin: { kind: "git", sha: "b".repeat(40) },
      snapshots: {
        ...first.snapshots,
        program: restoreContentSnapshot(
          manifest.resultDigest,
          manifest.baseResultDigest
        ),
      },
    });
    expect(Exit.isFailure(gitRestore)).toBe(true);
    for (const invalid of [
      { ...first, baseReleaseId: null },
      { ...first, baseManifestHash: null },
      { ...first, releaseId },
      { ...manifest, baseReleaseId: releaseId },
      { ...manifest, baseResultCount: 1 },
      { ...manifest, baseResultDigest: `sha256:${"1".repeat(64)}` },
      {
        ...manifest,
        scope: {
          families: manifest.scope.families,
          snapshots: ["program"],
        },
        snapshots: {
          ...manifest.snapshots,
          program: replaceContentSnapshot({
            baseSnapshotId: manifest.resultDigest,
            resultSnapshotId: manifest.baseResultDigest,
            rowCount: 1,
            rowDigest: manifest.resultDigest,
          }),
        },
      },
      {
        ...manifest,
        snapshots: {
          ...manifest.snapshots,
          program: restoreContentSnapshot(manifest.resultDigest, null),
        },
      },
    ]) {
      expect(
        Exit.isFailure(
          Schema.decodeUnknownExit(ContentReleaseManifestSchema)(invalid)
        )
      ).toBe(true);
    }
    const incoherent = Schema.decodeExit(ContentReleaseManifestSchema)({
      ...first,
      baseReleaseId: null,
    });
    if (Exit.isFailure(incoherent)) {
      expect(String(incoherent.cause)).toContain(
        "Expected a new release identity and a coherent source origin"
      );
    }
  });
});
