import { Effect, Either, Schema, Stream } from "effect";
import { describe, expect, it } from "vitest";
import { ReleaseIdSchema } from "#contracts/ids";
import { digestItems } from "#contracts/release/digest";
import { EMPTY_RESULT_CATALOG_DIGEST } from "#contracts/release/result";
import {
  emptyContentSnapshots,
  invertContentSnapshots,
  restoreContentSnapshot,
} from "#contracts/release/snapshot";
import {
  ContentChangeSchema,
  ContentReleaseManifestSchema,
  canonicalizeContentReleaseItem,
  RollbackSignedContentReleaseSchema,
} from "#contracts/release/spec";
import { makeReleaseItems } from "#contracts/test/items";
import { release as gitRelease } from "#contracts/test/request";

const releaseId = Schema.decodeUnknownSync(ReleaseIdSchema)("test-release");

const changes = Schema.decodeUnknownSync(Schema.Array(ContentChangeSchema))([
  {
    contentKey: "test:content",
    family: "material",
    locale: "id",
    operation: "delete",
  },
  {
    artifactHash: `sha256:${"b".repeat(64)}`,
    contentKey: "test:content",
    delivery: "public",
    family: "material",
    locale: "en",
    operation: "upsert",
    rendererDomain: "mathematics",
    sourcePath: "packages/corpus/test/content/en.mdx",
  },
]);
const items = makeReleaseItems(releaseId, changes);
const itemSummary = await Effect.runPromise(
  digestItems(releaseId, Stream.fromIterable(items))
);
const manifest = Schema.decodeUnknownSync(ContentReleaseManifestSchema)({
  baseManifestHash: null,
  baseReleaseId: null,
  baseResultCount: 0,
  baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
  deleteCount: itemSummary.deleteCount,
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
  snapshots: emptyContentSnapshots(),
  upsertCount: itemSummary.upsertCount,
});

describe("release spec", () => {
  it("rejects non-rollback envelopes at recovery boundaries", () => {
    const result = Schema.decodeUnknownEither(
      RollbackSignedContentReleaseSchema
    )(gitRelease);
    expect(Either.isLeft(result) ? String(result.left) : "").toContain(
      "Expected a signed rollback release."
    );
  });
  it("assigns deterministic indexes after canonical content-head sorting", () => {
    expect(
      items.map(({ change, index }) => [
        change.contentKey,
        change.locale,
        index,
      ])
    ).toEqual([
      ["test:content", "en", 0],
      ["test:content", "id", 1],
    ]);
    const [first] = items;
    expect(first).toBeDefined();
    if (!first) {
      return;
    }
    expect(canonicalizeContentReleaseItem(first)).toBe(
      `{"change":{"artifactHash":"sha256:${"b".repeat(64)}","contentKey":"test:content","delivery":"public","family":"material","locale":"en","operation":"upsert","rendererDomain":"mathematics","sourcePath":"packages/corpus/test/content/en.mdx"},"index":0,"releaseId":"test-release"}`
    );
  });

  it("requires forward rollback provenance and permits rollback of rollback", async () => {
    const firstId = Schema.decodeUnknownSync(ReleaseIdSchema)("rollback-first");
    const firstItems = makeReleaseItems(firstId, []);
    const firstSummary = await Effect.runPromise(
      digestItems(firstId, Stream.fromIterable(firstItems))
    );
    const first = Schema.decodeUnknownSync(ContentReleaseManifestSchema)({
      ...manifest,
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
    const second = Schema.decodeUnknownEither(ContentReleaseManifestSchema)({
      ...first,
      baseManifestHash: `sha256:${"2".repeat(64)}`,
      baseReleaseId: firstId,
      origin: { kind: "rollback", releaseId: firstId },
      releaseId: "rollback-second",
      snapshots: invertContentSnapshots(first.snapshots),
    });
    expect(Either.isRight(second)).toBe(true);
    const gitRestore = Schema.decodeUnknownEither(ContentReleaseManifestSchema)(
      {
        ...first,
        origin: { kind: "git", sha: "b".repeat(40) },
        snapshots: {
          ...first.snapshots,
          program: restoreContentSnapshot(
            manifest.resultDigest,
            manifest.baseResultDigest
          ),
        },
      }
    );
    expect(Either.isLeft(gitRestore)).toBe(true);
    for (const invalid of [
      { ...first, baseReleaseId: null },
      { ...first, baseManifestHash: null },
      { ...first, releaseId },
      { ...manifest, baseReleaseId: releaseId },
      { ...manifest, baseResultCount: 1 },
      { ...manifest, baseResultDigest: `sha256:${"1".repeat(64)}` },
      {
        ...manifest,
        snapshots: {
          ...manifest.snapshots,
          program: restoreContentSnapshot(manifest.resultDigest, null),
        },
      },
    ]) {
      expect(
        Either.isLeft(
          Schema.decodeUnknownEither(ContentReleaseManifestSchema)(invalid)
        )
      ).toBe(true);
    }
    const incoherent = Schema.decodeUnknownEither(ContentReleaseManifestSchema)(
      { ...first, baseReleaseId: null }
    );
    if (Either.isLeft(incoherent)) {
      expect(String(incoherent.left)).toContain(
        "Expected a new release identity and a coherent source origin"
      );
    }
  });
});
