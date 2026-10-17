import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema, Stream } from "effect";
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
import { withNextDigestFailure } from "#contracts/test/digest";
import {
  digestMaterialEntry,
  digestQuestionEntry,
} from "#contracts/test/rollback";

const releaseId = Schema.decodeSync(ReleaseIdSchema)("test-rollback-digest");

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

    rendererManifestHash: `sha256:${"c".repeat(64)}`,
    resultCount: 0,
    resultDigest: EMPTY_RESULT_CATALOG_DIGEST,
    rollbackCount,
    rollbackDigest,
    routeCount: 0,
    routeDigest: `sha256:${"f".repeat(64)}`,
    scope: {
      families: ["material"],
      snapshots: [],
    },
    snapshots: inheritContentSnapshots(null),
    upsertCount: 0,
  });
}
const rollbackEntries = [entry(), digestMaterialEntry, digestQuestionEntry];

describe("rollback snapshot digest", () => {
  it.effect("matches streamed and incremental canonical digests", () =>
    Effect.gen(function* () {
      const value = entry();
      const initial = yield* createRollbackSnapshotDigest;
      const updated = yield* updateRollbackSnapshotDigest(initial, value);
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

  it.effect(
    "maps a rejected Web Crypto digest to a rollback snapshot hash error",
    () =>
      Effect.gen(function* () {
        const state = yield* createRollbackSnapshotDigest;
        const failure = yield* withNextDigestFailure(
          finalizeRollbackSnapshotDigest(releaseId, state)
        ).pipe(Effect.flip);

        expect(failure).toMatchObject({
          _tag: "RollbackSnapshotHashError",
          releaseId,
        });
      })
  );

  it.effect(
    "pins one digest for the whole stream, one-element chunks, and the incremental fold of the same rollback snapshot",
    () =>
      Effect.gen(function* () {
        const whole = yield* digestRollbackSnapshot(
          releaseId,
          Stream.fromIterable(rollbackEntries)
        );
        const split = yield* digestRollbackSnapshot(
          releaseId,
          Stream.fromIterable(rollbackEntries).pipe(Stream.rechunk(1))
        );
        const initial = yield* createRollbackSnapshotDigest;
        const updated = yield* Effect.reduce(
          rollbackEntries,
          () => initial,
          (state, value) => updateRollbackSnapshotDigest(state, value)
        );
        const incremental = yield* finalizeRollbackSnapshotDigest(
          releaseId,
          updated
        );

        expect(whole).toEqual({
          count: 3,
          digest:
            "sha256:6fb0b72335c9af86935dc899046e54041ddb56b6d79c8fe3666244e2931ece22",
        });
        expect(split).toEqual({
          count: 3,
          digest:
            "sha256:6fb0b72335c9af86935dc899046e54041ddb56b6d79c8fe3666244e2931ece22",
        });
        expect(incremental).toBe(
          "sha256:6fb0b72335c9af86935dc899046e54041ddb56b6d79c8fe3666244e2931ece22"
        );
      })
  );

  it.effect(
    "reports the recomputed digest when a signed rollback root is wrong",
    () =>
      Effect.gen(function* () {
        const error = yield* verifyRollbackSnapshot({
          entries: Stream.fromIterable(rollbackEntries),
          manifest: manifest(
            rollbackEntries.length,
            Sha256HashSchema.make(`sha256:${"0".repeat(64)}`)
          ),
        }).pipe(Effect.flip);

        expect(error).toMatchObject({
          _tag: "RollbackSnapshotDigestMismatchError",
        });
        expect("actualDigest" in error ? error.actualDigest : undefined).toBe(
          "sha256:6fb0b72335c9af86935dc899046e54041ddb56b6d79c8fe3666244e2931ece22"
        );
      })
  );

  it.effect("accepts the rollback snapshot at its pinned signed root", () =>
    Effect.gen(function* () {
      const summary = yield* verifyRollbackSnapshot({
        entries: Stream.fromIterable(rollbackEntries),
        manifest: manifest(
          rollbackEntries.length,
          Sha256HashSchema.make(
            "sha256:6fb0b72335c9af86935dc899046e54041ddb56b6d79c8fe3666244e2931ece22"
          )
        ),
      });

      expect(summary).toEqual({
        count: 3,
        digest:
          "sha256:6fb0b72335c9af86935dc899046e54041ddb56b6d79c8fe3666244e2931ece22",
      });
    })
  );
});
