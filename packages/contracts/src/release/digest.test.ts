import type { BinaryLike } from "node:crypto";
import { Effect, Schema, Stream } from "effect";
import { describe, expect, it, vi } from "vitest";
import { ReleaseIdSchema } from "#contracts/ids";
import {
  createReleaseItemsDigest,
  digestItems,
  finalizeReleaseItemsDigest,
  updateReleaseItemsDigest,
} from "#contracts/release/digest";
import { ContentReleaseItemSchema } from "#contracts/release/spec";

const failures = vi.hoisted(() => ({ create: false, digest: false }));
const releaseId = Schema.decodeUnknownSync(ReleaseIdSchema)(
  "test-release-digest"
);

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
  return Schema.decodeUnknownSync(ContentReleaseItemSchema)({
    change: {
      contentKey,
      family: "material",
      locale: "en",
      operation: "delete",
    },
    index: 0,
    releaseId,
  });
}

describe("release digest", () => {
  it("matches streamed and incremental canonical digests", async () => {
    const value = item();
    const initial = await Effect.runPromise(
      createReleaseItemsDigest(value.releaseId)
    );
    const updated = await Effect.runPromise(
      updateReleaseItemsDigest(value.releaseId, initial, value)
    );
    const digest = await Effect.runPromise(
      finalizeReleaseItemsDigest(value.releaseId, updated)
    );
    const summary = await Effect.runPromise(
      digestItems(releaseId, Stream.make(value))
    );
    expect(summary).toEqual({
      count: 1,
      deleteCount: 1,
      digest,
      upsertCount: 0,
    });
    expect(updated).toMatchObject({ count: 1, deleteCount: 1, upsertCount: 0 });
  });

  it("maps creation, update, and finalization failures", async () => {
    failures.create = true;
    const creation = await Effect.runPromise(
      createReleaseItemsDigest(releaseId).pipe(Effect.flip)
    );
    failures.create = false;
    const initial = await Effect.runPromise(
      createReleaseItemsDigest(releaseId)
    );
    const update = await Effect.runPromise(
      updateReleaseItemsDigest(releaseId, initial, item("hash:failure")).pipe(
        Effect.flip
      )
    );
    failures.digest = true;
    const finalization = await Effect.runPromise(
      finalizeReleaseItemsDigest(releaseId, initial).pipe(Effect.flip)
    );
    failures.digest = false;
    expect([creation, update, finalization].map(({ _tag }) => _tag)).toEqual([
      "ReleaseItemsHashComputationError",
      "ReleaseItemsHashComputationError",
      "ReleaseItemsHashComputationError",
    ]);
  });
});
