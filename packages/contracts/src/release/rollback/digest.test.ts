import type { BinaryLike } from "node:crypto";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Schema, Stream } from "effect";
import { vi } from "vitest";
import { ReleaseIdSchema, Sha256HashSchema } from "#contracts/ids";
import { EMPTY_RESULT_CATALOG_DIGEST } from "#contracts/release/result/spec";
import {
  createRollbackSnapshotDigest,
  digestRollbackSnapshot,
  finalizeRollbackSnapshotDigest,
  updateRollbackSnapshotDigest,
  verifyRollbackSnapshot,
} from "#contracts/release/rollback/digest";
import { RollbackSnapshotEntrySchema } from "#contracts/release/rollback/spec";
import { inheritContentSnapshots } from "#contracts/release/snapshot/spec";
import { ContentReleaseManifestSchema } from "#contracts/release/spec";

const failures = vi.hoisted(() => ({ create: false, digest: false }));
const releaseId = Schema.decodeSync(ReleaseIdSchema)("test-rollback-digest");

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
  return Schema.decodeSync(RollbackSnapshotEntrySchema)({
    index: 0,
    releaseId,
    snapshot: {
      artifactLocale: "en",
      contentKey,
      family: "material",
      state: "absent",
    },
  });
}

/** Builds one exact manifest with supplied rollback snapshot evidence. */
function manifest(
  rollbackCount: number,
  rollbackDigest: typeof Sha256HashSchema.Type
) {
  return Schema.decodeSync(ContentReleaseManifestSchema)({
    activeAppLocales: ["en", "id"],
    baseActiveAppLocales: null,
    baseManifestHash: null,
    baseReleaseId: null,
    baseResultCount: 0,
    baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
    deleteCount: rollbackCount,
    format: "localized-content-release",
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
    scope: {
      content: [
        {
          artifactLocale: "en",
          contentKey: "test:rollback",
          family: "material",
        },
      ],
      families: [],
      snapshots: [],
    },
    snapshots: inheritContentSnapshots(null),
    upsertCount: 0,
  });
}

describe("rollback snapshot digest", () => {
  it.effect("matches streamed and incremental canonical digests", () =>
    Effect.gen(function* () {
      const value = entry();
      const initial = yield* createRollbackSnapshotDigest(releaseId);
      const updated = yield* updateRollbackSnapshotDigest(
        releaseId,
        initial,
        value
      );
      const digest = yield* finalizeRollbackSnapshotDigest(releaseId, updated);
      const summary = yield* digestRollbackSnapshot(
        releaseId,
        Stream.make(value)
      );

      expect(summary).toEqual({ count: 1, digest });
      expect(updated.count).toBe(1);
    })
  );

  it.effect("verifies signed count and digest evidence", () =>
    Effect.gen(function* () {
      const value = entry();
      const stream = Stream.make(value);
      const summary = yield* digestRollbackSnapshot(releaseId, stream);
      const verified = yield* verifyRollbackSnapshot({
        entries: stream,
        manifest: manifest(summary.count, summary.digest),
      });
      const count = yield* verifyRollbackSnapshot({
        entries: stream,
        manifest: manifest(0, summary.digest),
      }).pipe(Effect.flip);
      const digest = yield* verifyRollbackSnapshot({
        entries: stream,
        manifest: manifest(
          1,
          Sha256HashSchema.make(`sha256:${"f".repeat(64)}`)
        ),
      }).pipe(Effect.flip);

      expect(verified).toEqual(summary);
      expect(count._tag).toBe("RollbackSnapshotCountMismatchError");
      expect(digest._tag).toBe("RollbackSnapshotDigestMismatchError");
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
      const creation = yield* createRollbackSnapshotDigest(releaseId).pipe(
        Effect.flip
      );
      yield* Effect.sync(() => {
        failures.create = false;
      });
      const initial = yield* createRollbackSnapshotDigest(releaseId);
      const update = yield* updateRollbackSnapshotDigest(
        releaseId,
        initial,
        entry("hash:failure")
      ).pipe(Effect.flip);
      yield* Effect.sync(() => {
        failures.digest = true;
      });
      const finalization = yield* finalizeRollbackSnapshotDigest(
        releaseId,
        initial
      ).pipe(Effect.flip);

      expect([creation, update, finalization].map(({ _tag }) => _tag)).toEqual([
        "RollbackSnapshotHashError",
        "RollbackSnapshotHashError",
        "RollbackSnapshotHashError",
      ]);
    })
  );
});
