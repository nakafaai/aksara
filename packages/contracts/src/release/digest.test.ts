import type { BinaryLike } from "node:crypto";
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

const failures = vi.hoisted(() => ({ create: false, digest: false }));
const releaseId = Schema.decodeSync(ReleaseIdSchema)("test-release-digest");

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects deterministic digest creation, update, and finalization failures. */
    createHash(algorithm: string) {
      if (failures.create) {
        throw new TypeError("injected digest creation failure");
      }
      const hash = crypto.createHash(algorithm);
      return new Proxy(hash, {
        /** Preserves hash methods while intercepting explicit failure state. */
        get(target, property, receiver) {
          if (property === "update") {
            return (data: BinaryLike) => {
              if (String(data).includes('"contentKey":"hash:failure"')) {
                throw new TypeError("injected digest update failure");
              }
              target.update(data);
              return receiver;
            };
          }
          if (property === "digest" && failures.digest) {
            return () => {
              throw new TypeError("injected digest finalization failure");
            };
          }
          const value = Reflect.get(target, property, target);
          return typeof value === "function" ? value.bind(target) : value;
        },
      });
    },
  };
});

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
      const initial = yield* createReleaseItemsDigest(value.releaseId);
      const updated = yield* updateReleaseItemsDigest(
        value.releaseId,
        initial,
        value
      );
      const digest = yield* finalizeReleaseItemsDigest(
        value.releaseId,
        updated
      );
      const summary = yield* digestItems(releaseId, Stream.make(value));

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

  it.effect("maps creation, update, and finalization failures", () =>
    Effect.gen(function* () {
      yield* Effect.addFinalizer(() =>
        Effect.sync(() => {
          failures.create = false;
          failures.digest = false;
        })
      );
      yield* Effect.sync(() => {
        failures.create = true;
      });
      const creation = yield* createReleaseItemsDigest(releaseId).pipe(
        Effect.flip
      );
      yield* Effect.sync(() => {
        failures.create = false;
      });
      const initial = yield* createReleaseItemsDigest(releaseId);
      const update = yield* updateReleaseItemsDigest(
        releaseId,
        initial,
        item("hash:failure")
      ).pipe(Effect.flip);
      yield* Effect.sync(() => {
        failures.digest = true;
      });
      const finalization = yield* finalizeReleaseItemsDigest(
        releaseId,
        initial
      ).pipe(Effect.flip);

      expect([creation, update, finalization].map(({ _tag }) => _tag)).toEqual([
        "ReleaseItemsHashComputationError",
        "ReleaseItemsHashComputationError",
        "ReleaseItemsHashComputationError",
      ]);
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
        const whole = yield* digestItems(
          releaseId,
          Stream.make(upsert, deletion)
        );
        const split = yield* digestItems(
          releaseId,
          Stream.make(upsert, deletion).pipe(Stream.rechunk(1))
        );
        const initial = yield* createReleaseItemsDigest(releaseId);
        const withUpsert = yield* updateReleaseItemsDigest(
          releaseId,
          initial,
          upsert
        );
        const withDelete = yield* updateReleaseItemsDigest(
          releaseId,
          withUpsert,
          deletion
        );
        const incremental = yield* finalizeReleaseItemsDigest(
          releaseId,
          withDelete
        );

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
