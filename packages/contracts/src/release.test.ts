import { createHash } from "node:crypto";
import { Schema } from "effect";
import { describe, expect, it } from "vitest";
import { Sha256HashSchema } from "./ids.js";
import {
  ContentChangeSchema,
  ContentReleaseManifestSchema,
  canonicalizeContentReleaseItem,
  canonicalizeContentReleaseManifest,
  canonicalizeContentReleaseSigningInput,
  indexContentChanges,
} from "./release.js";
import { hashContentReleaseItems } from "./release-items-node.js";

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
)("release-1");
const changes = Schema.decodeUnknownSync(Schema.Array(ContentChangeSchema))([
  {
    contentKey: "article:function",
    kind: "article",
    locale: "id",
    operation: "delete",
  },
  {
    artifactHash: `sha256:${"b".repeat(64)}`,
    contentKey: "article:function",
    kind: "article",
    locale: "en",
    operation: "upsert",
    publicPath: "/en/article/function",
  },
]);
const items = indexContentChanges(releaseId, changes);
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

describe("release", () => {
  it("keeps the signed manifest constant-size while authenticating item count and digest", () => {
    const canonical = canonicalizeContentReleaseManifest(manifest);
    const manifestHash = Sha256HashSchema.make(
      `sha256:${createHash("sha256").update(canonical).digest("hex")}`
    );

    expect(canonical).not.toContain("article:function");
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
      ["article:function", "en", 0],
      ["article:function", "id", 1],
    ]);
    const [first] = items;
    expect(first).toBeDefined();
    if (!first) {
      return;
    }
    expect(canonicalizeContentReleaseItem(first)).toBe(
      `{"change":{"contentKey":"article:function","kind":"article","locale":"en","operation":"upsert","publicPath":"/en/article/function","artifactHash":"sha256:${"b".repeat(64)}"},"index":0,"releaseId":"release-1"}`
    );
  });

  it("accepts an empty rollback item stream", () => {
    const emptyItems = indexContentChanges(releaseId, []);
    const result = Schema.decodeUnknownEither(ContentReleaseManifestSchema)({
      ...manifest,
      itemCount: 0,
      itemsDigest: hashContentReleaseItems(emptyItems),
    });

    expect(result._tag).toBe("Right");
  });
});
