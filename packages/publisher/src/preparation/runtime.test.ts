import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import {
  inheritContentSnapshot,
  inheritContentSnapshots,
  replaceContentSnapshot,
} from "@nakafa/aksara-contracts/release/snapshot/spec";
import { makeTryoutSnapshot } from "@nakafa/aksara-contracts/tryout/snapshot/hash";
import { Effect } from "effect";

import { validatePreparedTryoutRuntime } from "#publisher/preparation/runtime";
import { prepareTestRelease } from "#test/preparation";

/** Builds one small runtime snapshot with a stable identity seed. */
function makeRuntimeSnapshot(seed: string, routeCount: number) {
  const digest = Sha256HashSchema.make(`sha256:${seed.repeat(64)}`);
  return makeTryoutSnapshot({
    activeAppLocales: ACTIVE_APP_LOCALES,
    catalogDigest: digest,
    counts: {
      country: 1,
      exam: routeCount > 1 ? 1 : 0,
      section: 0,
      set: 0,
      track: 0,
    },
    placementCount: 0,
    placementDigest: digest,
    routeCount,
  });
}

layer(NodeServices.layer)("try-out runtime preparation", (it) => {
  it.effect("accepts a replacement pair without a predecessor", () =>
    Effect.gen(function* () {
      const snapshot = makeRuntimeSnapshot("7", 1);
      const snapshots = inheritContentSnapshots(null);

      expect(
        yield* validatePreparedTryoutRuntime({
          previousSnapshots: null,
          runtime: { recovery: null, result: snapshot },
          snapshots: {
            ...snapshots,
            tryout: replaceContentSnapshot({
              baseSnapshotId: null,
              resultSnapshotId: snapshot.snapshotId,
              rowCount: 1,
              rowDigest: snapshot.catalogDigest,
            }),
          },
        })
      ).toBeUndefined();
    })
  );

  it.effect("rejects a replacement without its permanent runtime pair", () =>
    Effect.gen(function* () {
      const snapshot = makeRuntimeSnapshot("8", 1);
      const previousSnapshots = inheritContentSnapshots(null);
      const error = yield* validatePreparedTryoutRuntime({
        previousSnapshots,
        runtime: null,
        snapshots: {
          ...previousSnapshots,
          tryout: replaceContentSnapshot({
            baseSnapshotId: null,
            resultSnapshotId: snapshot.snapshotId,
            rowCount: 1,
            rowDigest: snapshot.catalogDigest,
          }),
        },
      }).pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "PreparedTryoutRuntimeMissingError",
      });
    })
  );

  it.effect("rejects a pair outside the resulting release state", () =>
    Effect.gen(function* () {
      const runtimeSnapshot = makeRuntimeSnapshot("8", 0);
      const error = yield* prepareTestRelease({
        tryoutRuntime: { recovery: null, result: runtimeSnapshot },
      }).pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "PreparedTryoutRuntimeSnapshotError",
        actualSnapshotId: runtimeSnapshot.snapshotId,
        expectedSnapshotId: null,
      });
    })
  );

  it.effect("requires the distinct predecessor pair for a replacement", () =>
    Effect.gen(function* () {
      const previous = makeRuntimeSnapshot("8", 1);
      const result = makeRuntimeSnapshot("9", 2);
      const previousSnapshots = {
        ...inheritContentSnapshots(null),
        tryout: inheritContentSnapshot(previous.snapshotId),
      };
      const error = yield* validatePreparedTryoutRuntime({
        previousSnapshots,
        runtime: { recovery: null, result },
        snapshots: {
          ...previousSnapshots,
          tryout: replaceContentSnapshot({
            baseSnapshotId: previous.snapshotId,
            resultSnapshotId: result.snapshotId,
            rowCount: 1,
            rowDigest: result.catalogDigest,
          }),
        },
      }).pipe(Effect.flip);

      expect(error._tag).toBe("PreparedTryoutRuntimeMissingError");
    })
  );

  it.effect("rejects mismatched or duplicate retained pairs", () =>
    Effect.gen(function* () {
      const current = makeRuntimeSnapshot("8", 1);
      const other = makeRuntimeSnapshot("9", 2);
      const previousSnapshots = {
        ...inheritContentSnapshots(null),
        tryout: inheritContentSnapshot(current.snapshotId),
      };
      const mismatch = yield* prepareTestRelease({
        previousSnapshots,
        tryoutRuntime: { recovery: other, result: current },
      }).pipe(Effect.flip);
      expect(mismatch).toMatchObject({
        _tag: "PreparedTryoutRuntimeSnapshotError",
        actualSnapshotId: other.snapshotId,
        expectedSnapshotId: current.snapshotId,
      });

      const duplicate = yield* prepareTestRelease({
        previousSnapshots,
        tryoutRuntime: { recovery: current, result: current },
      }).pipe(Effect.flip);
      expect(duplicate).toMatchObject({
        _tag: "PreparedTryoutRuntimeTransitionError",
        snapshotId: current.snapshotId,
      });
    })
  );
});
