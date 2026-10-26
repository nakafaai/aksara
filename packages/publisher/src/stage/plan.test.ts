import { describe, expect, it } from "@effect/vitest";
import type { StageGroupInput } from "@nakafa/aksara-contracts/transport/group";

import { Effect, Stream } from "effect";

import { stagePreparedRelease } from "#publisher/stage/plan";
import { makeRelease } from "#test/publication";
import { makeRollbackRelease } from "#test/publication/run";
import { makePublicationTarget } from "#test/target";
import { transportRelease } from "#test/transport/spec";

const { prepared } = await makeRelease(transportRelease.manifest.releaseId);
const rollback = await makeRollbackRelease("test-rollback-stage");

describe("prepared release staging", () => {
  it.effect("stages release-owned rows through one authenticated group", () =>
    Effect.gen(function* () {
      const stageGroup = vi.fn((_group: StageGroupInput) => Effect.void);
      const target = makePublicationTarget({ stageGroup });
      yield* stagePreparedRelease({
        artifacts: Stream.empty,
        items: prepared.items,
        prepared,
        routes: Stream.empty,
        target,
      });

      expect(stageGroup).toHaveBeenCalledOnce();
      const group = stageGroup.mock.calls[0]?.[0];
      expect(group?.releaseId).toBe(prepared.manifest.releaseId);
      expect(group?.requests[0]).toMatchObject({
        operation: "stageItemBatch",
      });
    })
  );

  it.effect(
    "stages authenticated rollback projections through the shared operation",
    () =>
      Effect.gen(function* () {
        const stageGroup = vi.fn((_group: StageGroupInput) => Effect.void);
        const target = makePublicationTarget({ stageGroup });
        yield* stagePreparedRelease({
          artifacts: Stream.empty,
          items: Stream.empty,
          prepared: rollback.prepared,
          routes: Stream.empty,
          target,
        });
        expect(stageGroup).toHaveBeenCalledOnce();
        expect(stageGroup.mock.calls[0]?.[0].requests).toMatchObject([
          { operation: "stageProjectionBatch" },
        ]);
      })
  );
});
