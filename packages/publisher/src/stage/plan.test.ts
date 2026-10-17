import { describe, expect, it } from "@effect/vitest";
import type { StageGroupInput } from "@nakafa/aksara-contracts/transport/group";

import { Effect, Stream } from "effect";

import {
  stagePreparedRelease,
  stageRuntimeBundles,
} from "#publisher/stage/plan";
import { makeRelease } from "#test/publication";
import { makeRollbackRelease } from "#test/publication/run";
import { makePublicationTarget } from "#test/target";
import {
  transportRecoveryRuntimeBundle as recoveryRuntimeBundle,
  transportRelease,
  transportRuntimeBundle,
} from "#test/transport/spec";

const { prepared } = await makeRelease(transportRelease.manifest.releaseId);
const rollback = await makeRollbackRelease("test-rollback-stage");

describe("prepared release staging", () => {
  it.effect("stages runtime pairs before release-owned rows", () =>
    Effect.gen(function* () {
      const stageGroup = vi.fn((_group: StageGroupInput) => Effect.void);
      const target = makePublicationTarget({ stageGroup });
      yield* stageRuntimeBundles({
        bundles: [transportRuntimeBundle, recoveryRuntimeBundle],
        releaseId: prepared.manifest.releaseId,
        target,
      });
      yield* stagePreparedRelease({
        artifacts: Stream.empty,
        items: prepared.items,
        prepared,
        routes: Stream.empty,
        target,
      });
      expect(stageGroup).toHaveBeenCalledTimes(2);
      const runtimeGroup = stageGroup.mock.calls[0]?.[0];
      const releaseGroup = stageGroup.mock.calls[1]?.[0];
      expect(runtimeGroup?.releaseId).toBe(prepared.manifest.releaseId);
      expect(runtimeGroup?.requests).toMatchObject([
        {
          bundle: transportRuntimeBundle,
          operation: "stageTryoutRuntimeBundle",
          releaseId: prepared.manifest.releaseId,
        },
        {
          bundle: recoveryRuntimeBundle,
          operation: "stageTryoutRuntimeBundle",
          releaseId: prepared.manifest.releaseId,
        },
      ]);
      expect(releaseGroup?.requests[0]).toMatchObject({
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
