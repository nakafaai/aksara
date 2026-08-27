import { assert, describe, it } from "@effect/vitest";
import { Effect, Schema } from "effect";

import { ACTIVE_APP_LOCALES } from "#contracts/locale";
import {
  computeTryoutHistoryCleanupLimit,
  TryoutHistoryCleanupLimitError,
} from "#contracts/migration/tryout/history/cleanup";
import {
  TRYOUT_HISTORY_MIGRATION_PLAN_FORMAT,
  TryoutHistoryMigrationPlanPayloadSchema,
} from "#contracts/migration/tryout/history/spec";
import { migrationSource } from "#contracts/test/migration";

/** Creates one valid signed-plan payload around the shared retained source. */
function planPayload() {
  const hash = `sha256:${"f".repeat(64)}`;
  return Schema.decodeSync(TryoutHistoryMigrationPlanPayloadSchema)({
    format: TRYOUT_HISTORY_MIGRATION_PLAN_FORMAT,
    migrationId: "retained-tryout-history-v1",
    source: migrationSource.evidence,
    target: {
      artifacts: { count: 2, digest: hash },
      bundleHash: hash,
      catalog: { count: 1, digest: hash },
      placements: { count: 1, digest: hash },
      snapshot: {
        activeAppLocales: ACTIVE_APP_LOCALES,
        catalogDigest: hash,
        counts: { country: 1, exam: 0, section: 0, set: 0, track: 0 },
        format: "localized-tryout-snapshot",
        placementCount: 1,
        placementDigest: hash,
        routeCount: 1,
        snapshotId: hash,
      },
    },
  });
}

describe("try-out history cleanup limit", () => {
  it.effect("derives every source, scale, ledger, artifact, and root row", () =>
    Effect.gen(function* () {
      assert.strictEqual(
        yield* computeTryoutHistoryCleanupLimit(planPayload()),
        19
      );
    })
  );

  it.effect("rejects a cleanup limit outside safe integer precision", () =>
    Effect.gen(function* () {
      const payload = planPayload();
      const failure = yield* computeTryoutHistoryCleanupLimit({
        ...payload,
        source: {
          ...payload.source,
          catalogRowCount: Number.MAX_SAFE_INTEGER,
        },
      }).pipe(Effect.flip);

      assert.instanceOf(failure, TryoutHistoryCleanupLimitError);
    })
  );
});
