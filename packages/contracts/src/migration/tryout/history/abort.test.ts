import { assert, describe, it } from "@effect/vitest";
import { Effect } from "effect";

import { ReleaseIdSchema, Sha256HashSchema } from "#contracts/ids";
import { computeTryoutHistoryAbortLimit } from "#contracts/migration/tryout/history/abort";
import { TryoutHistoryMigrationStagingStatusSchema } from "#contracts/transport/migration/tryout/response";

const staging = TryoutHistoryMigrationStagingStatusSchema.make({
  artifactMapCount: 1,
  catalogMapCount: 2,
  migrationId: ReleaseIdSchema.make("retained-tryout-history-v1"),
  phase: "staging",
  placementMapCount: 3,
  sourceSnapshotId: Sha256HashSchema.make(`sha256:${"a".repeat(64)}`),
});

describe("try-out history staging abort bound", () => {
  it.effect("counts every mapping, owned target, and fixed staging row", () =>
    Effect.gen(function* () {
      const limit = yield* computeTryoutHistoryAbortLimit(staging);
      const failure = yield* computeTryoutHistoryAbortLimit({
        ...staging,
        artifactMapCount: Number.MAX_SAFE_INTEGER,
      }).pipe(Effect.flip);

      assert.strictEqual(limit, 15);
      assert.strictEqual(failure._tag, "TryoutHistoryAbortLimitError");
    })
  );
});
