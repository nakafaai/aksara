import { describe, expect, it } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import type { StageGroupInput } from "@nakafa/aksara-contracts/transport/group";
import { SignedTryoutRuntimeBundleSchema } from "@nakafa/aksara-contracts/tryout/runtime/spec";
import { makeTryoutSnapshot } from "@nakafa/aksara-contracts/tryout/snapshot/hash";
import { Effect, Schema, Stream } from "effect";

import {
  stagePreparedRelease,
  stageRuntimeBundles,
} from "#publisher/stage/plan";
import { makeRelease } from "#test/publication";
import { makeRollbackRelease } from "#test/publication/run";
import { makePublicationTarget } from "#test/target";
import { transportRelease, transportRuntimeBundle } from "#test/transport/spec";

const { prepared } = await makeRelease(transportRelease.manifest.releaseId);
const rollback = await makeRollbackRelease("test-rollback-stage");
const recoveryRuntimeBundle = Schema.decodeSync(
  SignedTryoutRuntimeBundleSchema
)({
  ...transportRuntimeBundle,
  bundleHash: Sha256HashSchema.make(`sha256:${"5".repeat(64)}`),
  payload: {
    ...transportRuntimeBundle.payload,
    snapshot: makeTryoutSnapshot({
      activeAppLocales: transportRelease.manifest.activeAppLocales,
      catalogDigest: transportRelease.manifest.itemsDigest,
      counts: { country: 0, exam: 0, section: 0, set: 0, track: 0 },
      placementCount: 0,
      placementDigest: transportRelease.manifest.resultDigest,
      routeCount: 0,
    }),
  },
});

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

  it.effect("confines rollback projections to the group-only operation", () =>
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
        { operation: "stageRollbackProjectionBatch" },
      ]);
    })
  );
});
