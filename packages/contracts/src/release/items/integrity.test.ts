// @vitest-environment node

import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema, Stream } from "effect";
import { verifyContentReleaseItems } from "#contracts/release/items";
import {
  items,
  makeCandidate,
  makeManifest,
  reject,
  replaceItem,
  upsertChange,
} from "#contracts/release/items/fixture";
import { ContentReleaseManifestSchema } from "#contracts/release/spec";

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
  it.effect("accepts only exact predecessor-scoped release items", () =>
    Effect.gen(function* () {
      const manifest = yield* makeManifest();
      const [first] = items;
      if (first === undefined) {
        return yield* Effect.die("Expected a predecessor release item.");
      }
      const exact = yield* Schema.decodeEffect(ContentReleaseManifestSchema)({
        ...manifest,
        scope: {
          content: items.map(({ change }) => ({
            artifactLocale: change.artifactLocale,
            contentKey: change.contentKey,
            family: change.family,
          })),
          families: [],
          snapshots: [],
        },
      });
      expect(
        yield* verifyContentReleaseItems({
          items: Stream.fromIterable(items),
          manifest: exact,
        })
      ).toEqual({ deleteCount: 1, upsertCount: 1 });

      const mismatched = yield* Schema.decodeEffect(
        ContentReleaseManifestSchema
      )({
        ...manifest,
        scope: {
          content: [
            {
              artifactLocale: first.change.artifactLocale,
              contentKey: first.change.contentKey,
              family: first.change.family,
            },
          ],
          families: [],
          snapshots: [],
        },
      });
      const error = yield* reject(items, mismatched);
      expect(error).toMatchObject({
        _tag: "ReleaseItemScopeError",
        itemOffset: 1,
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
