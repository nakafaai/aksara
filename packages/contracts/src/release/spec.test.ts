import { createHash } from "node:crypto";
import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  type ReleaseId,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "#contracts/ids";
import { hashContentReleaseItems } from "#contracts/release/digest";
import {
  type ContentChange,
  ContentChangeSchema,
  ContentReleaseItemSchema,
  ContentReleaseManifestSchema,
  canonicalizeContentReleaseItem,
  canonicalizeContentReleaseManifest,
  canonicalizeContentReleaseSigningInput,
  compareContentChanges,
} from "#contracts/release/spec";

const releaseId = Schema.decodeUnknownSync(ReleaseIdSchema)("test-release");

/** Builds canonically ordered release items with deterministic indexes. */
function makeItems(release: ReleaseId, input: readonly ContentChange[]) {
  return [...input]
    .sort(compareContentChanges)
    .map((change, index) =>
      ContentReleaseItemSchema.make({ change, index, releaseId: release })
    );
}

const changes = Schema.decodeUnknownSync(Schema.Array(ContentChangeSchema))([
  {
    contentKey: "test:content",
    locale: "id",
    operation: "delete",
  },
  {
    artifactHash: `sha256:${"b".repeat(64)}`,
    contentKey: "test:content",
    delivery: "public",
    locale: "en",
    operation: "upsert",
    publicPath: "subjects/test",
    rendererDomain: "material-mathematics",
    sourcePath: "packages/corpus/test/content/en.mdx",
  },
]);
const items = makeItems(releaseId, changes);
const manifest = Schema.decodeUnknownSync(ContentReleaseManifestSchema)({
  baseReleaseId: null,
  itemCount: items.length,
  itemsDigest: hashContentReleaseItems(items),
  origin: { kind: "git", sha: "a".repeat(40) },
  projectionCount: 1,
  projectionDigest: `sha256:${"c".repeat(64)}`,
  releaseId,
  rendererContractVersion: "2.0.0",
  rendererManifestHash: `sha256:${"d".repeat(64)}`,
});

describe("release spec", () => {
  it("keeps the signed manifest constant-size while authenticating item count and digest", () => {
    const canonical = canonicalizeContentReleaseManifest(manifest);
    const manifestHash = Sha256HashSchema.make(
      `sha256:${createHash("sha256").update(canonical).digest("hex")}`
    );

    expect(canonical).not.toContain("test:content");
    expect(canonical).toContain(`"itemCount":${items.length}`);
    expect(canonical).toContain(`"itemsDigest":"${manifest.itemsDigest}"`);
    expect(canonical).toContain('"projectionCount":1');
    expect(canonicalizeContentReleaseSigningInput(manifestHash, manifest)).toBe(
      `nakafa.aksara.content-release.v1\n${manifestHash}\n${canonical}`
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
      `{"change":{"contentKey":"test:content","delivery":"public","locale":"en","operation":"upsert","publicPath":"subjects/test","artifactHash":"sha256:${"b".repeat(64)}","rendererDomain":"material-mathematics","sourcePath":"packages/corpus/test/content/en.mdx"},"index":0,"releaseId":"test-release"}`
    );
  });

  it("requires forward rollback provenance and permits rollback of rollback", () => {
    const firstId = Schema.decodeUnknownSync(ReleaseIdSchema)("rollback-first");
    const firstItems = makeItems(firstId, []);
    const first = Schema.decodeUnknownSync(ContentReleaseManifestSchema)({
      ...manifest,
      baseReleaseId: releaseId,
      itemCount: 0,
      itemsDigest: hashContentReleaseItems(firstItems),
      origin: { kind: "rollback", releaseId },
      projectionCount: 0,
      releaseId: firstId,
    });
    const second = Schema.decodeUnknownEither(ContentReleaseManifestSchema)({
      ...first,
      baseReleaseId: firstId,
      origin: { kind: "rollback", releaseId: firstId },
      releaseId: "rollback-second",
    });
    expect(Either.isRight(second)).toBe(true);
    for (const invalid of [
      { ...first, baseReleaseId: null },
      { ...first, releaseId },
      { ...manifest, baseReleaseId: releaseId },
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

  it("orders locales within one stable content identity", () => {
    const decodeChange = Schema.decodeUnknownSync(ContentChangeSchema);
    const english = decodeChange({
      contentKey: "test:content",
      locale: "en",
      operation: "delete",
    });
    const indonesian = decodeChange({
      contentKey: "test:content",
      locale: "id",
      operation: "delete",
    });

    expect(compareContentChanges(english, indonesian)).toBe(-1);
    expect(compareContentChanges(indonesian, english)).toBe(1);
    expect(compareContentChanges(english, english)).toBe(0);
  });
});
