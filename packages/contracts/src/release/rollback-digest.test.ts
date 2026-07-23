import type { BinaryLike } from "node:crypto";
import { Effect, Schema, Stream } from "effect";
import { describe, expect, it, vi } from "vitest";
import { ReleaseIdSchema } from "#contracts/ids";
import { EMPTY_RESULT_CATALOG_DIGEST } from "#contracts/release/result";
import { RollbackSnapshotEntrySchema } from "#contracts/release/rollback";
import {
  createRollbackSnapshotDigest,
  digestRollbackSnapshot,
  finalizeRollbackSnapshotDigest,
  updateRollbackSnapshotDigest,
  verifyRollbackSnapshot,
} from "#contracts/release/rollback-digest";
import { emptyContentSnapshots } from "#contracts/release/snapshot";
import { ContentReleaseManifestSchema } from "#contracts/release/spec";

const failures = vi.hoisted(() => ({ create: false, digest: false }));
const releaseId = Schema.decodeUnknownSync(ReleaseIdSchema)(
  "test-rollback-digest"
);

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects deterministic rollback snapshot hash failures. */
    createHash(algorithm: string) {
      if (failures.create) {
        throw new TypeError("injected rollback digest creation failure");
      }
      const hash = crypto.createHash(algorithm);
      return new Proxy(hash, {
        /** Preserves real methods while intercepting explicit test markers. */
        get(target, property, receiver) {
          if (property === "update") {
            return (data: BinaryLike) => {
              if (String(data).includes('"contentKey":"hash:failure"')) {
                throw new TypeError("injected rollback digest update failure");
              }
              target.update(data);
              return receiver;
            };
          }
          if (property === "digest" && failures.digest) {
            return () => {
              throw new TypeError(
                "injected rollback digest finalization failure"
              );
            };
          }
          const value = Reflect.get(target, property, target);
          return typeof value === "function" ? value.bind(target) : value;
        },
      });
    },
  };
});

/** Builds one absent prior-state entry for rollback snapshot tests. */
function entry(contentKey = "test:rollback") {
  return Schema.decodeUnknownSync(RollbackSnapshotEntrySchema)({
    index: 0,
    releaseId,
    snapshot: {
      contentKey,
      family: "material",
      locale: "en",
      state: "absent",
    },
  });
}

/** Builds one exact manifest with supplied rollback snapshot evidence. */
function manifest(rollbackCount: number, rollbackDigest: `sha256:${string}`) {
  return Schema.decodeUnknownSync(ContentReleaseManifestSchema)({
    baseManifestHash: null,
    baseReleaseId: null,
    baseResultCount: 0,
    baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
    deleteCount: rollbackCount,
    itemCount: rollbackCount,
    itemsDigest: `sha256:${"a".repeat(64)}`,
    origin: { kind: "git", sha: "a".repeat(40) },
    projectionCount: 0,
    projectionDigest: `sha256:${"b".repeat(64)}`,
    releaseId,
    rendererContractVersion: "1.0.0",
    rendererManifestHash: `sha256:${"c".repeat(64)}`,
    resultCount: 0,
    resultDigest: EMPTY_RESULT_CATALOG_DIGEST,
    rollbackCount,
    rollbackDigest,
    routeCount: 0,
    routeDigest: `sha256:${"f".repeat(64)}`,
    snapshots: emptyContentSnapshots(),
    upsertCount: 0,
  });
}

describe("rollback snapshot digest", () => {
  it("matches streamed and incremental canonical digests", async () => {
    const value = entry();
    const initial = await Effect.runPromise(
      createRollbackSnapshotDigest(releaseId)
    );
    const updated = await Effect.runPromise(
      updateRollbackSnapshotDigest(releaseId, initial, value)
    );
    const digest = await Effect.runPromise(
      finalizeRollbackSnapshotDigest(releaseId, updated)
    );
    const summary = await Effect.runPromise(
      digestRollbackSnapshot(releaseId, Stream.make(value))
    );

    expect(summary).toEqual({ count: 1, digest });
    expect(updated.count).toBe(1);
  });

  it("verifies signed count and digest evidence", async () => {
    const value = entry();
    const stream = Stream.make(value);
    const summary = await Effect.runPromise(
      digestRollbackSnapshot(releaseId, stream)
    );
    await expect(
      Effect.runPromise(
        verifyRollbackSnapshot({
          entries: stream,
          manifest: manifest(summary.count, summary.digest),
        })
      )
    ).resolves.toEqual(summary);

    const count = await Effect.runPromise(
      verifyRollbackSnapshot({
        entries: stream,
        manifest: manifest(0, summary.digest),
      }).pipe(Effect.flip)
    );
    const digest = await Effect.runPromise(
      verifyRollbackSnapshot({
        entries: stream,
        manifest: manifest(1, `sha256:${"f".repeat(64)}`),
      }).pipe(Effect.flip)
    );

    expect(count._tag).toBe("RollbackSnapshotCountMismatchError");
    expect(digest._tag).toBe("RollbackSnapshotDigestMismatchError");
  });

  it("maps creation, update, and finalization failures", async () => {
    failures.create = true;
    const creation = await Effect.runPromise(
      createRollbackSnapshotDigest(releaseId).pipe(Effect.flip)
    );
    failures.create = false;
    const initial = await Effect.runPromise(
      createRollbackSnapshotDigest(releaseId)
    );
    const update = await Effect.runPromise(
      updateRollbackSnapshotDigest(
        releaseId,
        initial,
        entry("hash:failure")
      ).pipe(Effect.flip)
    );
    failures.digest = true;
    const finalization = await Effect.runPromise(
      finalizeRollbackSnapshotDigest(releaseId, initial).pipe(Effect.flip)
    );
    failures.digest = false;

    expect([creation, update, finalization].map(({ _tag }) => _tag)).toEqual([
      "RollbackSnapshotHashError",
      "RollbackSnapshotHashError",
      "RollbackSnapshotHashError",
    ]);
  });
});
