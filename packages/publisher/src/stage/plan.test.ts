import { describe, expect, it } from "@effect/vitest";
import type { StageGroupInput } from "@nakafa/aksara-contracts/transport/group";
import { Effect, Stream } from "effect";
import { vi } from "vitest";

import { stagePreparedRelease } from "#publisher/stage/plan";
import { makeRelease } from "#test/publication";
import { makePublicationTarget } from "#test/target";
import { transportRelease, transportRuntimeBundle } from "#test/transport/spec";

const { prepared } = await makeRelease(transportRelease.manifest.releaseId);

describe("prepared release staging", () => {
  it.effect("stages a permanent runtime bundle before release-owned rows", () =>
    Effect.gen(function* () {
      const stageGroup = vi.fn((_group: StageGroupInput) => Effect.void);
      const target = makePublicationTarget({ stageGroup });
      yield* stagePreparedRelease({
        artifacts: Stream.empty,
        items: Stream.empty,
        prepared,
        projections: Stream.empty,
        routes: Stream.empty,
        target,
        tryoutRuntimeBundle: transportRuntimeBundle,
      });
      expect(stageGroup).toHaveBeenCalledTimes(1);
      expect(stageGroup.mock.calls[0]?.[0]).toMatchObject({
        releaseId: prepared.manifest.releaseId,
        requests: [
          {
            bundle: transportRuntimeBundle,
            operation: "stageTryoutRuntimeBundle",
            releaseId: prepared.manifest.releaseId,
          },
        ],
      });
    })
  );
});
