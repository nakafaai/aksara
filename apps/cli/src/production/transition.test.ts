import { assert, describe, it } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";

import { selectSourceBase } from "#cli/production/base";
import { selectTryoutRuntimeTransition } from "#cli/production/transition";
import { gitBundle, releaseId, runtimeBundleFor } from "#test/target";

const TRYOUT_SNAPSHOT_ID = Sha256HashSchema.make(`sha256:${"c".repeat(64)}`);
const OTHER_SNAPSHOT_ID = Sha256HashSchema.make(`sha256:${"d".repeat(64)}`);

describe("production runtime bundle transition", () => {
  it.effect("selects every exact candidate and recovery shape", () =>
    Effect.gen(function* () {
      const active = gitBundle("release-runtime-transition", {
        baseReleaseId: releaseId("release-runtime-parent"),
        tryoutSnapshotId: TRYOUT_SNAPSHOT_ID,
      });
      const base = selectSourceBase(active);
      const bundle = runtimeBundleFor(active, TRYOUT_SNAPSHOT_ID);
      const result = {
        ...bundle.payload.snapshot,
        snapshotId: OTHER_SNAPSHOT_ID,
      };

      assert.isNull(
        yield* selectTryoutRuntimeTransition({
          base,
          bundle,
          snapshot: null,
        })
      );
      assert.deepStrictEqual(
        yield* selectTryoutRuntimeTransition({
          base: null,
          bundle: null,
          snapshot: result,
        }),
        { recovery: null, result }
      );
      assert.deepStrictEqual(
        yield* selectTryoutRuntimeTransition({
          base,
          bundle,
          snapshot: bundle.payload.snapshot,
        }),
        { recovery: null, result: bundle.payload.snapshot }
      );
      assert.deepStrictEqual(
        yield* selectTryoutRuntimeTransition({
          base,
          bundle,
          snapshot: result,
        }),
        { recovery: bundle.payload.snapshot, result }
      );
      const missing = yield* selectTryoutRuntimeTransition({
        base,
        bundle: null,
        snapshot: result,
      }).pipe(Effect.flip);
      assert.strictEqual(missing._tag, "BaseTryoutRuntimeBundleMismatchError");
      assert.strictEqual(missing.reason, "missing-recovery");
    })
  );
});
