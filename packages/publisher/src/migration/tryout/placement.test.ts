import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { makeArtifactRequirements } from "#publisher/migration/tryout/artifact";
import { convertTryoutPlacements } from "#publisher/migration/tryout/placement";
import { replaySpoolFailure } from "#publisher/replay/error";
import { convertedArtifacts } from "#test/migration/converted";
import { failureReason } from "#test/migration/error";
import { convertedArtifactSpool, historicalRows } from "#test/migration/rows";

describe("try-out placement conversion", () => {
  it.effect(
    "rejects duplicate, missing, unreadable, and misindexed artifact evidence",
    () =>
      Effect.gen(function* () {
        const requirements = yield* makeArtifactRequirements(
          historicalRows,
          convertedArtifacts.length
        );
        const firstRequirement = requirements.at(0);
        const firstArtifact = convertedArtifacts.at(0);
        if (firstRequirement === undefined || firstArtifact === undefined) {
          return yield* Effect.die("Expected converted artifact fixtures.");
        }
        const duplicate = yield* convertTryoutPlacements(
          historicalRows.placements,
          [...requirements, firstRequirement],
          convertedArtifactSpool([...convertedArtifacts, firstArtifact])
        ).pipe(Effect.flip);
        const missing = yield* convertTryoutPlacements(
          historicalRows.placements,
          requirements.slice(0, 1),
          convertedArtifactSpool(convertedArtifacts.slice(0, 1))
        ).pipe(Effect.flip);
        const unreadable = yield* convertTryoutPlacements(
          historicalRows.placements,
          requirements,
          {
            count: requirements.length,
            read: (index) =>
              Effect.fail(
                replaySpoolFailure("read", "unreadable test record", index)
              ),
          }
        ).pipe(Effect.flip);
        const misindexed = yield* convertTryoutPlacements(
          historicalRows.placements,
          requirements,
          convertedArtifactSpool([...convertedArtifacts].reverse())
        ).pipe(Effect.flip);

        expect(
          [duplicate, missing, unreadable, misindexed].map(failureReason)
        ).toEqual([
          "artifact-count",
          "artifact-requirement",
          "artifact-contract",
          "artifact-contract",
        ]);
      })
  );
});
