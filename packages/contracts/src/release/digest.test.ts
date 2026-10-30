import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema, Stream } from "effect";
import { ReleaseIdSchema } from "#contracts/ids";
import {
  createReleaseItemsDigest,
  digestItems,
  finalizeReleaseItemsDigest,
  updateReleaseItemsDigest,
} from "#contracts/release/digest";
import { ContentReleaseItemSchema } from "#contracts/release/spec";

const releaseId = Schema.decodeSync(ReleaseIdSchema)("test-release-digest");

/** Builds one ordered tombstone for digest tests. */
function item(contentKey = "test:digest") {
  return Schema.decodeSync(ContentReleaseItemSchema)({
    change: {
      artifactLocale: "en",
      contentKey,
      family: "material",
      operation: "delete",
    },
    index: 0,
    releaseId,
  });
}

describe("release digest", () => {
  it.effect("matches streamed and incremental canonical digests", () =>
    Effect.gen(function* () {
      const value = item();
      const initial = yield* createReleaseItemsDigest;
      const updated = yield* updateReleaseItemsDigest(initial, value);
      const digest = yield* finalizeReleaseItemsDigest(updated);
      const summary = yield* digestItems(Stream.make(value));

      expect(summary).toEqual({
        count: 1,
        deleteCount: 1,
        digest,
        upsertCount: 0,
      });
      expect(updated).toMatchObject({
        count: 1,
        deleteCount: 1,
        upsertCount: 0,
      });
    })
  );

  it.effect(
    "pins one digest for the whole stream, one-element chunks, and the incremental fold of the same release items",
    () =>
      Effect.gen(function* () {
        const upsert = yield* Schema.decodeEffect(ContentReleaseItemSchema)({
          change: {
            artifactHash: `sha256:${"a".repeat(64)}`,
            artifactLocale: "en",
            contentKey: "test:digest-upsert",
            delivery: "public",
            family: "material",
            operation: "upsert",
            rendererDomain: "mathematics",
            sourcePath: "packages/corpus/test/digest-upsert/en.mdx",
          },
          index: 0,
          releaseId,
        });
        const deletion = yield* Schema.decodeEffect(ContentReleaseItemSchema)({
          change: {
            artifactLocale: "id",
            contentKey: "test:digest-delete",
            family: "material",
            operation: "delete",
          },
          index: 1,
          releaseId,
        });
        const whole = yield* digestItems(Stream.make(upsert, deletion));
        const split = yield* digestItems(
          Stream.make(upsert, deletion).pipe(Stream.rechunk(1))
        );
        const initial = yield* createReleaseItemsDigest;
        const withUpsert = yield* updateReleaseItemsDigest(initial, upsert);
        const withDelete = yield* updateReleaseItemsDigest(
          withUpsert,
          deletion
        );
        const incremental = yield* finalizeReleaseItemsDigest(withDelete);

        expect(whole).toEqual({
          count: 2,
          deleteCount: 1,
          digest:
            "sha256:e1a70bb040e26f8b21d0cad9db8ecdce6899fb439ce07bf82ebf3f74ba76193a",
          upsertCount: 1,
        });
        expect(split).toEqual({
          count: 2,
          deleteCount: 1,
          digest:
            "sha256:e1a70bb040e26f8b21d0cad9db8ecdce6899fb439ce07bf82ebf3f74ba76193a",
          upsertCount: 1,
        });
        expect(incremental).toBe(
          "sha256:e1a70bb040e26f8b21d0cad9db8ecdce6899fb439ce07bf82ebf3f74ba76193a"
        );
      })
  );
});
