import { assert, describe, it } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";

import { selectSourceBase } from "#cli/production/base";
import { selectTryoutRuntimeTransition } from "#cli/production/transition";
import { gitBundle, releaseId, runtimeBundleFor } from "#test/target";

const TRYOUT_SNAPSHOT_ID = Sha256HashSchema.make(`sha256:${"c".repeat(64)}`);
const OTHER_SNAPSHOT_ID = Sha256HashSchema.make(`sha256:${"d".repeat(64)}`);
const THIRD_SNAPSHOT_ID = Sha256HashSchema.make(`sha256:${"e".repeat(64)}`);

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
          recovery: null,
          snapshot: null,
        })
      );
      assert.deepStrictEqual(
        yield* selectTryoutRuntimeTransition({
          base: null,
          bundle: null,
          recovery: null,
          snapshot: result,
        }),
        { recovery: null, result }
      );
      assert.deepStrictEqual(
        yield* selectTryoutRuntimeTransition({
          base,
          bundle,
          recovery: null,
          snapshot: bundle.payload.snapshot,
        }),
        { recovery: null, result: bundle.payload.snapshot }
      );
      assert.deepStrictEqual(
        yield* selectTryoutRuntimeTransition({
          base,
          bundle,
          recovery: null,
          snapshot: result,
        }),
        { recovery: bundle.payload.snapshot, result }
      );
      const missing = yield* selectTryoutRuntimeTransition({
        base,
        bundle: null,
        recovery: null,
        snapshot: result,
      }).pipe(Effect.flip);
      assert.strictEqual(missing._tag, "BaseTryoutRuntimeMismatchError");
      assert.strictEqual(missing.reason, "missing-recovery");

      assert.deepStrictEqual(
        yield* selectTryoutRuntimeTransition({
          base,
          bundle: null,
          recovery: bundle.payload.snapshot,
          snapshot: result,
        }),
        { recovery: bundle.payload.snapshot, result }
      );

      for (const input of [
        { base, bundle, recovery: bundle.payload.snapshot, snapshot: result },
        {
          base,
          bundle: null,
          recovery: bundle.payload.snapshot,
          snapshot: null,
        },
        {
          base,
          bundle: null,
          recovery: result,
          snapshot: bundle.payload.snapshot,
        },
      ] as const) {
        const failure = yield* selectTryoutRuntimeTransition(input).pipe(
          Effect.flip
        );
        assert.strictEqual(failure._tag, "BaseTryoutRuntimeMismatchError");
        assert.strictEqual(failure.reason, "unexpected-recovery");
      }

      const wrong = yield* selectTryoutRuntimeTransition({
        base,
        bundle: null,
        recovery: { ...result, snapshotId: THIRD_SNAPSHOT_ID },
        snapshot: result,
      }).pipe(Effect.flip);
      assert.strictEqual(wrong._tag, "BaseTryoutRuntimeMismatchError");
      assert.strictEqual(wrong.reason, "snapshot");
    })
  );
});
