// @vitest-environment node

import { Effect, Schema, Stream } from "effect";
import { describe, expect, it } from "vitest";
import { compareContentHeads } from "#contracts/content";
import { type ReleaseId, ReleaseIdSchema } from "#contracts/ids";
import { digestItems } from "#contracts/release/digest";
import { verifyContentReleaseItems } from "#contracts/release/items";
import {
  type ContentChange,
  ContentChangeSchema,
  type ContentReleaseItem,
  ContentReleaseItemSchema,
  ContentReleaseManifestSchema,
} from "#contracts/release/spec";

const releaseId =
  Schema.decodeUnknownSync(ReleaseIdSchema)("test-release-items");

/** Builds canonically ordered release items with deterministic indexes. */
function makeItems(release: ReleaseId, input: readonly ContentChange[]) {
  return [...input]
    .sort(compareContentHeads)
    .map((change, index) =>
      ContentReleaseItemSchema.make({ change, index, releaseId: release })
    );
}

const changes = Schema.decodeUnknownSync(Schema.Array(ContentChangeSchema))([
  {
    artifactHash: `sha256:${"a".repeat(64)}`,
    contentKey: "test:a",
    delivery: "public",
    locale: "en",
    operation: "upsert",
    rendererDomain: "mathematics",
    sourcePath: "packages/corpus/test/a/en.mdx",
  },
  {
    contentKey: "test:b",
    locale: "id",
    operation: "delete",
  },
]);
const items = makeItems(releaseId, changes);
const itemSummary = await Effect.runPromise(
  digestItems(releaseId, Stream.fromIterable(items))
);
const manifest = Schema.decodeUnknownSync(ContentReleaseManifestSchema)({
  baseReleaseId: "test-release-parent",
  itemCount: items.length,
  itemsDigest: itemSummary.digest,
  origin: { kind: "git", sha: "a".repeat(40) },
  projectionCount: 1,
  projectionDigest: `sha256:${"b".repeat(64)}`,
  releaseId,
  rendererContractVersion: "1.0.0",
  rendererManifestHash: `sha256:${"c".repeat(64)}`,
});

/** Creates a fresh replayable stream from one ordered item collection. */
function itemStream(values: readonly unknown[]) {
  return Stream.fromIterable(values);
}

/** Runs item verification and returns its expected typed failure. */
function reject(candidate: readonly unknown[], candidateManifest = manifest) {
  return Effect.runPromise(
    verifyContentReleaseItems({
      items: itemStream(candidate),
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

/** Creates a self-consistent candidate manifest and item collection. */
async function makeCandidate(candidateChanges: readonly unknown[]) {
  const decoded = Schema.decodeUnknownSync(Schema.Array(ContentChangeSchema))(
    candidateChanges
  );
  const candidateItems = makeItems(manifest.releaseId, decoded);
  const summary = await Effect.runPromise(
    digestItems(manifest.releaseId, Stream.fromIterable(candidateItems))
  );
  const candidateManifest = Schema.decodeUnknownSync(
    ContentReleaseManifestSchema
  )({
    ...manifest,
    itemCount: candidateItems.length,
    itemsDigest: summary.digest,
  });
  return { items: candidateItems, manifest: candidateManifest };
}

describe("release item integrity", () => {
  it("authenticates items without retaining the complete collection", async () => {
    const verified = await Effect.runPromise(
      verifyContentReleaseItems({ items: itemStream(items), manifest })
    );
    expect(verified).toEqual({ deleteCount: 1, upsertCount: 1 });
    expect(verified).not.toHaveProperty("items");
  });

  it("replays one stream with fresh ordering and route state", async () => {
    let reads = 0;
    const replayable = itemStream(items).pipe(
      Stream.tap(() =>
        Effect.sync(() => {
          reads += 1;
        })
      )
    );
    await Effect.runPromise(
      verifyContentReleaseItems({ items: replayable, manifest })
    );
    await Effect.runPromise(
      verifyContentReleaseItems({ items: replayable, manifest })
    );
    expect(reads).toBe(items.length * 2);
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
        change: { ...item.change, locale: "en" },
      })),
    ],
  ])(
    "rejects %s tampering through the signed digest",
    async (_label, value) => {
      const error = await reject(value);
      expect(error._tag).toBe("ReleaseItemsDigestMismatchError");
    }
  );

  it("rejects order, count, release, and index mismatches", async () => {
    const reversed = [...items].reverse().map((item, index) => ({
      ...item,
      index,
    }));
    const errors = await Promise.all([
      reject(reversed),
      reject(items.slice(0, 1)),
      reject(replaceItem(0, (item) => ({ ...item, releaseId: "other" }))),
      reject(replaceItem(1, (item) => ({ ...item, index: 0 }))),
      reject(replaceItem(1, (item) => ({ ...item, index: 2 }))),
    ]);
    expect(errors.map((error) => error._tag)).toEqual([
      "ReleaseItemOrderError",
      "ReleaseItemCountMismatchError",
      "ReleaseItemReleaseMismatchError",
      "ReleaseItemIndexMismatchError",
      "ReleaseItemIndexMismatchError",
    ]);
  });

  it("rejects duplicate public paths within one locale", async () => {
    const candidate = await makeCandidate([
      {
        artifactHash: `sha256:${"a".repeat(64)}`,
        contentKey: "test:a",
        delivery: "public",
        locale: "en",
        operation: "upsert",
        publicPath: "subjects/test/shared",
        rendererDomain: "mathematics",
        sourcePath: "packages/corpus/test/a/en.mdx",
      },
      {
        artifactHash: `sha256:${"b".repeat(64)}`,
        contentKey: "test:b",
        delivery: "authenticated",
        locale: "en",
        operation: "upsert",
        publicPath: "subjects/test/shared",
        rendererDomain: "mathematics",
        sourcePath: "packages/corpus/test/b/en.mdx",
      },
    ]);
    const error = await reject(candidate.items, candidate.manifest);
    expect(error).toMatchObject({
      _tag: "DuplicateReleasePublicPathError",
      duplicateItemIndex: 1,
      firstItemIndex: 0,
      locale: "en",
      publicPath: "subjects/test/shared",
    });
  });

  it("allows route deletion and locale-specific route reuse", async () => {
    const transfer = await makeCandidate([
      {
        artifactHash: `sha256:${"a".repeat(64)}`,
        contentKey: "test:a",
        delivery: "public",
        locale: "en",
        operation: "upsert",
        publicPath: "subjects/test/shared",
        rendererDomain: "mathematics",
        sourcePath: "packages/corpus/test/a/en.mdx",
      },
      { contentKey: "test:b", locale: "en", operation: "delete" },
    ]);
    const locales = await makeCandidate([
      {
        artifactHash: `sha256:${"a".repeat(64)}`,
        contentKey: "test:a",
        delivery: "public",
        locale: "en",
        operation: "upsert",
        publicPath: "subjects/test/shared",
        rendererDomain: "mathematics",
        sourcePath: "packages/corpus/test/a/en.mdx",
      },
      {
        artifactHash: `sha256:${"b".repeat(64)}`,
        contentKey: "test:b",
        delivery: "entitled",
        locale: "id",
        operation: "upsert",
        publicPath: "subjects/test/shared",
        rendererDomain: "mathematics",
        sourcePath: "packages/corpus/test/b/id.mdx",
      },
    ]);
    await expect(
      Effect.runPromise(
        verifyContentReleaseItems({
          items: itemStream(transfer.items),
          manifest: transfer.manifest,
        })
      )
    ).resolves.toEqual({ deleteCount: 1, upsertCount: 1 });
    await expect(
      Effect.runPromise(
        verifyContentReleaseItems({
          items: itemStream(locales.items),
          manifest: locales.manifest,
        })
      )
    ).resolves.toEqual({ deleteCount: 0, upsertCount: 2 });
  });

  it("rejects excess and stale tombstone fields without exposing values", async () => {
    const secret = "must-not-leak";
    const [excess, stale] = await Promise.all([
      reject(replaceItem(0, (item) => ({ ...item, secret }))),
      reject(
        replaceItem(1, (item) => ({
          ...item,
          change: { ...item.change, delivery: "public", publicPath: secret },
        }))
      ),
    ]);
    expect(excess._tag).toBe("ReleaseItemDecodeError");
    expect(stale._tag).toBe("ReleaseItemDecodeError");
    expect(JSON.stringify([excess, stale])).not.toContain(secret);
  });

  it("propagates upstream stream failures unchanged", async () => {
    const error = await Effect.runPromise(
      verifyContentReleaseItems({
        items: Stream.fail("source-failed"),
        manifest,
      }).pipe(Effect.flip)
    );
    expect(error).toBe("source-failed");
  });
});
