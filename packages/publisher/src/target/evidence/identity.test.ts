import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { hasBoundMigration } from "#publisher/target/evidence/migration";
import {
  migrationProtocol,
  migrationResponse,
  otherHash,
  otherId,
} from "#test/migration/protocol";
import { migrationStatus } from "#test/migration/status";

describe("migration signed identity evidence", () => {
  it.effect(
    "binds the plan to every permanent source and target identity",
    () =>
      Effect.gen(function* () {
        const exchanges = yield* migrationProtocol();
        const ready = exchanges.plan.response.value;
        if (ready.command !== "stagePlan") {
          return yield* Effect.die("Expected staged plan evidence.");
        }
        const fields = [
          { migrationId: otherId },
          { planHash: otherHash },
          { sourceSnapshotId: otherHash },
          { targetBundleHash: otherHash },
          { targetSnapshotId: otherHash },
        ];
        const responses = fields.map((override) =>
          migrationResponse({
            ...ready,
            status: migrationStatus({ ...ready.status, ...override }),
          })
        );

        expect(
          responses.map((value) =>
            hasBoundMigration(exchanges.plan.request, value)
          )
        ).toEqual(Array.from({ length: fields.length }, () => false));
      })
  );
});
