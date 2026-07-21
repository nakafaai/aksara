// @vitest-environment node

import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  ContentChangeSchema,
  type ContentReleaseItem,
  ContentReleaseManifestSchema,
  indexContentChanges,
} from "./release.js";
import {
  hashContentReleaseItems,
  verifyContentReleaseItems,
} from "./release-items-node.js";

const releaseId = "release-items";
const changes = Schema.decodeUnknownSync(Schema.Array(ContentChangeSchema))([
  {
    artifactHash: `sha256:${"a".repeat(64)}`,
    contentKey: "article:a",
    kind: "article",
    locale: "en",
    operation: "upsert",
  },
  {
    contentKey: "article:b",
    kind: "article",
    locale: "id",
    operation: "delete",
  },
]);
const items = indexContentChanges(
  Schema.decodeUnknownSync(ContentReleaseManifestSchema.fields.releaseId)(
    releaseId
  ),
  changes
);
const manifest = Schema.decodeUnknownSync(ContentReleaseManifestSchema)({
  aksaraSha: "a".repeat(40),
  baseReleaseId: "release-parent",
  expectedCounts: {
    artifacts: 1,
    graphRows: 0,
    heads: 1,
    llmsDocuments: 1,
    routes: 1,
    searchRows: 1,
    sitemapEntries: 1,
  },
  expectedDigest: `sha256:${"b".repeat(64)}`,
  itemCount: items.length,
  itemsDigest: hashContentReleaseItems(items),
  releaseId,
  rendererContractVersion: "1.0.0",
  rendererManifestHash: `sha256:${"c".repeat(64)}`,
});

function reject(candidate: readonly unknown[], candidateManifest = manifest) {
  return Effect.runPromise(
    verifyContentReleaseItems({
      items: candidate,
      manifest: candidateManifest,
    }).pipe(Effect.flip)
  );
}

function replaceItem(
  index: number,
  update: (item: ContentReleaseItem) => unknown
) {
  return items.map((item, itemIndex) =>
    itemIndex === index ? update(item) : item
  );
}

function makeCandidate(candidateChanges: readonly unknown[]) {
  const decoded = Schema.decodeUnknownSync(Schema.Array(ContentChangeSchema))(
    candidateChanges
  );
  const candidateItems = indexContentChanges(manifest.releaseId, decoded);
  const candidateManifest = Schema.decodeUnknownSync(
    ContentReleaseManifestSchema
  )({
    ...manifest,
    itemCount: candidateItems.length,
    itemsDigest: hashContentReleaseItems(candidateItems),
  });
  return { items: candidateItems, manifest: candidateManifest };
}

describe("release item integrity", () => {
  it("strictly decodes and authenticates ordered items separately", async () => {
    const verified = await Effect.runPromise(
      verifyContentReleaseItems({ items, manifest })
    );

    expect(verified.items).toEqual(items);
    expect(verified.upsertCount).toBe(1);
    expect(verified.deleteCount).toBe(1);
  });

  it.each([
    [
      "upsert content",
      replaceItem(0, (item) => ({
        ...item,
        change: { ...item.change, kind: "material" },
      })),
    ],
    [
      "delete tombstone",
      replaceItem(1, (item) => ({
        ...item,
        change: { ...item.change, publicPath: "/id/article/b" },
      })),
    ],
  ])("rejects %s tampering through the signed digest", async (_label, value) => {
    const error = await reject(value);

    expect(error._tag).toBe("ReleaseItemsDigestMismatchError");
  });

  it("rejects item order tampering before digest comparison", async () => {
    const reversed = [...items].reverse().map((item, index) => ({
      ...item,
      index,
    }));
    const error = await reject(reversed);

    expect(error._tag).toBe("ReleaseItemOrderError");
  });

  it("rejects a count mismatch", async () => {
    const error = await reject(items.slice(0, 1));

    expect(error._tag).toBe("ReleaseItemCountMismatchError");
  });

  it("rejects duplicate public paths within one locale", async () => {
    const candidate = makeCandidate([
      {
        artifactHash: `sha256:${"a".repeat(64)}`,
        contentKey: "article:a",
        kind: "article",
        locale: "en",
        operation: "upsert",
        publicPath: "/shared",
      },
      {
        contentKey: "article:b",
        kind: "article",
        locale: "en",
        operation: "delete",
        publicPath: "/shared",
      },
    ]);
    const error = await reject(candidate.items, candidate.manifest);

    expect(error._tag).toBe("DuplicateReleasePublicPathError");
    if (error._tag === "DuplicateReleasePublicPathError") {
      expect(error).toMatchObject({
        duplicateItemIndex: 1,
        firstItemIndex: 0,
        locale: "en",
        publicPath: "/shared",
      });
    }
  });

  it("allows the same public path in different locales", async () => {
    const candidate = makeCandidate([
      {
        artifactHash: `sha256:${"a".repeat(64)}`,
        contentKey: "article:a",
        kind: "article",
        locale: "en",
        operation: "upsert",
        publicPath: "/shared",
      },
      {
        artifactHash: `sha256:${"b".repeat(64)}`,
        contentKey: "article:b",
        kind: "article",
        locale: "id",
        operation: "upsert",
        publicPath: "/shared",
      },
    ]);

    await expect(
      Effect.runPromise(
        verifyContentReleaseItems({
          items: candidate.items,
          manifest: candidate.manifest,
        })
      )
    ).resolves.toMatchObject({ upsertCount: 2 });
  });

  it.each([
    ["duplicate", 0],
    ["missing", 2],
  ])("rejects a %s item index", async (_label, index) => {
    const error = await reject(replaceItem(1, (item) => ({ ...item, index })));

    expect(error._tag).toBe("ReleaseItemIndexMismatchError");
  });

  it("rejects excess item fields without exposing their values", async () => {
    const secret = "must-not-leak";
    const error = await reject(replaceItem(0, (item) => ({ ...item, secret })));

    expect(error._tag).toBe("ReleaseItemDecodeError");
    expect(JSON.stringify(error)).not.toContain(secret);
  });
});
