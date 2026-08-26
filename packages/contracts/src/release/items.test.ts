// @vitest-environment node

import { describe, expect, it } from "@effect/vitest";
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
function upsertChange(
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
const items = makeReleaseItems(releaseId, changes);
/** Builds the signed manifest identity for the canonical item fixture. */
const makeManifest = Effect.fn("AksaraContractsTest.makeItemManifest")(
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

/** Runs item verification and returns its expected typed failure. */
function reject(
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
function replaceItem(
  index: number,
  update: (item: ContentReleaseItem) => unknown
) {
  return items.map((item, itemIndex) =>
    itemIndex === index ? update(item) : item
  );
}

/** Creates a self-consistent candidate manifest and item collection. */
const makeCandidate = Effect.fn("AksaraContractsTest.makeItemCandidate")(
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
describe("release item integrity", () => {
  it.effect(
    "authenticates items without retaining the complete collection",
    () =>
      Effect.gen(function* () {
        const manifest = yield* makeManifest();
        const verified = yield* verifyContentReleaseItems({
          items: Stream.fromIterable(items),
          manifest,
        });
        expect(verified).toEqual({ deleteCount: 1, upsertCount: 1 });
        expect(verified).not.toHaveProperty("items");
      })
  );
  it.effect(
    "rejects operation totals that differ from the signed manifest",
    () =>
      Effect.gen(function* () {
        const manifest = yield* makeManifest();
        const mismatched = yield* Schema.decodeEffect(
          ContentReleaseManifestSchema
        )({
          ...manifest,
          deleteCount: 0,
          upsertCount: 2,
        });
        const error = yield* reject(items, mismatched);
        expect(error).toMatchObject({
          _tag: "ReleaseItemOperationCountMismatchError",
          actualDeletes: 1,
          actualUpserts: 1,
          expectedDeletes: 0,
          expectedUpserts: 2,
        });
      })
  );
  it.effect(
    "rejects a signed item outside the whole-family publication scope",
    () =>
      Effect.gen(function* () {
        const manifest = yield* makeManifest();
        const scoped = yield* Schema.decodeEffect(ContentReleaseManifestSchema)(
          {
            ...manifest,
            scope: {
              families: [],
              snapshots: ["program"],
            },
          }
        );
        const error = yield* reject(items, scoped);
        expect(error).toMatchObject({
          _tag: "ReleaseItemScopeError",
          itemOffset: 0,
        });
      })
  );
  it.effect("replays one stream with fresh ordering and route state", () =>
    Effect.gen(function* () {
      const manifest = yield* makeManifest();
      let reads = 0;
      const replayable = Stream.fromIterable(items).pipe(
        Stream.tap(() =>
          Effect.sync(() => {
            reads += 1;
          })
        )
      );
      yield* verifyContentReleaseItems({ items: replayable, manifest });
      yield* verifyContentReleaseItems({ items: replayable, manifest });
      expect(reads).toBe(items.length * 2);
    })
  );
  it.effect.each([
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
        change: { ...item.change, artifactLocale: "en" },
      })),
    ],
  ] as const)(
    "rejects %s tampering through the signed digest",
    ([_label, value]) =>
      Effect.gen(function* () {
        const error = yield* reject(value);
        expect(error._tag).toBe("ReleaseItemsDigestMismatchError");
      })
  );
  it.effect("rejects order, count, release, and index mismatches", () =>
    Effect.gen(function* () {
      const reversed = [...items].reverse().map((item, index) => ({
        ...item,
        index,
      }));
      const errors = yield* Effect.all([
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
    })
  );
  it.effect("keeps body items independent from route ownership", () =>
    Effect.gen(function* () {
      const transfer = yield* makeCandidate([
        upsertChange("test:a", "en", "public", "a"),
        {
          artifactLocale: "en",
          contentKey: "test:b",
          family: "material",
          operation: "delete",
        },
      ]);
      const locales = yield* makeCandidate([
        upsertChange("test:a", "en", "public", "a"),
        upsertChange("test:b", "id", "entitled", "b"),
      ]);
      expect(
        yield* verifyContentReleaseItems({
          items: Stream.fromIterable(transfer.items),
          manifest: transfer.manifest,
        })
      ).toEqual({ deleteCount: 1, upsertCount: 1 });
      expect(
        yield* verifyContentReleaseItems({
          items: Stream.fromIterable(locales.items),
          manifest: locales.manifest,
        })
      ).toEqual({ deleteCount: 0, upsertCount: 2 });
    })
  );
  it.effect(
    "rejects excess and stale tombstone fields without exposing values",
    () =>
      Effect.gen(function* () {
        const secret = "must-not-leak";
        const [excess, stale] = yield* Effect.all([
          reject(replaceItem(0, (item) => ({ ...item, secret }))),
          reject(
            replaceItem(1, (item) => ({
              ...item,
              change: {
                ...item.change,
                delivery: "public",
                publicPath: secret,
              },
            }))
          ),
        ]);
        expect(excess._tag).toBe("ReleaseItemDecodeError");
        expect(stale._tag).toBe("ReleaseItemDecodeError");
        expect(JSON.stringify([excess, stale])).not.toContain(secret);
      })
  );
  it.effect("propagates upstream stream failures unchanged", () =>
    Effect.gen(function* () {
      const manifest = yield* makeManifest();
      const error = yield* verifyContentReleaseItems({
        items: Stream.fail("source-failed"),
        manifest,
      }).pipe(Effect.flip);
      expect(error).toBe("source-failed");
    })
  );
});
