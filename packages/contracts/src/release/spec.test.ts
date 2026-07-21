import { createHash } from "node:crypto";
import { Schema } from "effect";
import { describe, expect, it } from "vitest";
import { type ReleaseId, Sha256HashSchema } from "#contracts/ids.js";
import { hashContentReleaseItems } from "#contracts/release/items.js";
import {
  type ContentChange,
  ContentChangeSchema,
  ContentReleaseItemSchema,
  ContentReleaseManifestSchema,
  canonicalizeContentReleaseItem,
  canonicalizeContentReleaseManifest,
  canonicalizeContentReleaseSigningInput,
  compareContentChanges,
} from "#contracts/release/spec.js";

const counts = {
  artifacts: 2,
  graphRows: 1,
  heads: 2,
  llmsDocuments: 2,
  routes: 2,
  searchRows: 2,
  sitemapEntries: 2,
} as const;

const releaseId = Schema.decodeUnknownSync(
  ContentReleaseManifestSchema.fields.releaseId
)("test-release");

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
    locale: "en",
    operation: "upsert",
    publicPath: "/en/test",
  },
]);
const items = makeItems(releaseId, changes);
const manifest = Schema.decodeUnknownSync(ContentReleaseManifestSchema)({
  aksaraSha: "a".repeat(40),
  baseReleaseId: null,
  expectedCounts: counts,
  expectedDigest: `sha256:${"c".repeat(64)}`,
  itemCount: items.length,
  itemsDigest: hashContentReleaseItems(items),
  releaseId,
  rendererContractVersion: "1.0.0",
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
      `{"change":{"contentKey":"test:content","locale":"en","operation":"upsert","publicPath":"/en/test","artifactHash":"sha256:${"b".repeat(64)}"},"index":0,"releaseId":"test-release"}`
    );
  });

  it("accepts an empty rollback item stream", () => {
    const emptyItems = makeItems(releaseId, []);
    const result = Schema.decodeUnknownEither(ContentReleaseManifestSchema)({
      ...manifest,
      itemCount: 0,
      itemsDigest: hashContentReleaseItems(emptyItems),
    });

    expect(result._tag).toBe("Right");
  });
});
