// @vitest-environment node

import type { BinaryLike } from "node:crypto";
import { Effect, Schema } from "effect";
import { describe, expect, it, vi } from "vitest";
import type { ReleaseId } from "#contracts/ids.js";
import {
  hashContentReleaseItems,
  verifyContentReleaseItems,
} from "#contracts/release/items.js";
import {
  type ContentChange,
  ContentChangeSchema,
  type ContentReleaseItem,
  ContentReleaseItemSchema,
  ContentReleaseManifestSchema,
  compareContentChanges,
} from "#contracts/release/spec.js";

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects one deterministic release-item hashing failure. */
    createHash(algorithm: string) {
      const hash = crypto.createHash(algorithm);
      return new Proxy(hash, {
        /** Preserves real Hash methods while intercepting the failure marker. */
        get(target, property, receiver) {
          if (property === "update") {
            return (data: BinaryLike) => {
              if (String(data).includes('"contentKey":"hash:failure"')) {
                throw new TypeError("injected release item hash failure");
              }
              target.update(data);
              return receiver;
            };
          }
          const value = Reflect.get(target, property, target);
          return typeof value === "function" ? value.bind(target) : value;
        },
      });
    },
  };
});

const releaseId = Schema.decodeUnknownSync(
  ContentReleaseManifestSchema.fields.releaseId
)("test-release-items");

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
    artifactHash: `sha256:${"a".repeat(64)}`,
    contentKey: "test:a",
    locale: "en",
    operation: "upsert",
  },
  {
    contentKey: "test:b",
    locale: "id",
    operation: "delete",
  },
]);
const items = makeItems(releaseId, changes);
const manifest = Schema.decodeUnknownSync(ContentReleaseManifestSchema)({
  aksaraSha: "a".repeat(40),
  baseReleaseId: "test-release-parent",
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

/** Runs item verification and returns its expected typed failure. */
function reject(candidate: readonly unknown[], candidateManifest = manifest) {
  return Effect.runPromise(
    verifyContentReleaseItems({
      items: candidate,
      manifest: candidateManifest,
    }).pipe(Effect.flip)
  );
}

/** Replaces one item without mutating the shared fixture stream. */
function replaceItem(
  index: number,
  update: (item: ContentReleaseItem) => unknown
) {
  return items.map((item, itemIndex) =>
    itemIndex === index ? update(item) : item
  );
}

/** Creates a self-consistent candidate manifest and item stream. */
function makeCandidate(candidateChanges: readonly unknown[]) {
  const decoded = Schema.decodeUnknownSync(Schema.Array(ContentChangeSchema))(
    candidateChanges
  );
  const candidateItems = makeItems(manifest.releaseId, decoded);
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
        change: { ...item.change, artifactHash: `sha256:${"f".repeat(64)}` },
      })),
    ],
    [
      "delete tombstone",
      replaceItem(1, (item) => ({
        ...item,
        change: { ...item.change, publicPath: "/id/test/changed" },
      })),
    ],
  ])(
    "rejects %s tampering through the signed digest",
    async (_label, value) => {
      const error = await reject(value);
      expect(error._tag).toBe("ReleaseItemsDigestMismatchError");
    }
  );

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

  it("rejects an item from another release", async () => {
    const error = await reject(
      replaceItem(0, (item) => ({ ...item, releaseId: "other-release" }))
    );

    expect(error._tag).toBe("ReleaseItemReleaseMismatchError");
  });

  it("rejects duplicate public paths within one locale", async () => {
    const candidate = makeCandidate([
      {
        artifactHash: `sha256:${"a".repeat(64)}`,
        contentKey: "test:a",
        locale: "en",
        operation: "upsert",
        publicPath: "/test/shared",
      },
      {
        artifactHash: `sha256:${"b".repeat(64)}`,
        contentKey: "test:b",
        locale: "en",
        operation: "upsert",
        publicPath: "/test/shared",
      },
    ]);
    const error = await reject(candidate.items, candidate.manifest);

    expect(error._tag).toBe("DuplicateReleasePublicPathError");
    if (error._tag === "DuplicateReleasePublicPathError") {
      expect(error).toMatchObject({
        duplicateItemIndex: 1,
        firstItemIndex: 0,
        locale: "en",
        publicPath: "/test/shared",
      });
    }
  });

  it("allows a route transfer from a deleted head to an upsert", async () => {
    const candidate = makeCandidate([
      {
        artifactHash: `sha256:${"a".repeat(64)}`,
        contentKey: "test:a",
        locale: "en",
        operation: "upsert",
        publicPath: "/test/shared",
      },
      {
        contentKey: "test:b",
        locale: "en",
        operation: "delete",
        publicPath: "/test/shared",
      },
    ]);

    await expect(
      Effect.runPromise(
        verifyContentReleaseItems({
          items: candidate.items,
          manifest: candidate.manifest,
        })
      )
    ).resolves.toMatchObject({ deleteCount: 1, upsertCount: 1 });
  });

  it("allows the same public path in different locales", async () => {
    const candidate = makeCandidate([
      {
        artifactHash: `sha256:${"a".repeat(64)}`,
        contentKey: "test:a",
        locale: "en",
        operation: "upsert",
        publicPath: "/test/shared",
      },
      {
        artifactHash: `sha256:${"b".repeat(64)}`,
        contentKey: "test:b",
        locale: "id",
        operation: "upsert",
        publicPath: "/test/shared",
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
  it("maps release-item hashing failures to the release identity", async () => {
    const failureItems = makeItems(releaseId, [
      Schema.decodeUnknownSync(ContentChangeSchema)({
        contentKey: "hash:failure",
        locale: "en",
        operation: "delete",
      }),
    ]);
    const failureManifest = ContentReleaseManifestSchema.make({
      ...manifest,
      itemCount: failureItems.length,
    });
    const error = await reject(failureItems, failureManifest);
    expect(error).toMatchObject({
      _tag: "ReleaseItemsHashComputationError",
      releaseId,
    });
  });
});
