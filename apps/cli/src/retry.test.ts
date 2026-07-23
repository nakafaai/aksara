import { PublicationTarget } from "@nakafa/aksara-publisher/publication/spec";
import { PublicationTargetTransportError } from "@nakafa/aksara-publisher/target/errors";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { retryPublicationTarget, retryTransport } from "#cli/retry";

/** Creates one retryable target failure at the publication client boundary. */
function transportFailure() {
  return new PublicationTargetTransportError({
    detail: { reason: "network" },
    stage: "items",
  });
}

/** Creates a complete target whose unused operations fail as defects. */
function makeTarget(
  current: (typeof PublicationTarget.Service)["current"]
): typeof PublicationTarget.Service {
  /** Makes every operation outside the retry assertion fail immediately. */
  const unused = () => Effect.die("Unused publication target operation.");
  return PublicationTarget.of({
    abort: unused,
    accept: unused,
    activate: unused,
    activateRecovery: unused,
    cleanup: unused,
    current,
    headPage: unused,
    recovery: unused,
    rollbackPage: unused,
    routePage: unused,
    stageArtifactBatch: unused,
    stageItemBatch: unused,
    stageProjectionBatch: unused,
    stageRecovery: unused,
    stageRelease: unused,
    stageRouteBatch: unused,
    stageSnapshot: unused,
    stageSnapshotBatch: unused,
    status: unused,
    verify: unused,
  });
}

describe("publication transport retry", () => {
  it("retries transient failures and preserves the eventual result", async () => {
    let attempts = 0;
    const result = await Effect.runPromise(
      retryTransport(
        Effect.suspend(() => {
          attempts += 1;
          return attempts === 1
            ? Effect.fail(transportFailure())
            : Effect.succeed("published");
        })
      )
    );

    expect(result).toBe("published");
    expect(attempts).toBe(2);
  });

  it("stops after three bounded retries", async () => {
    let attempts = 0;
    const error = await Effect.runPromise(
      retryTransport(
        Effect.suspend(() => {
          attempts += 1;
          return Effect.fail(transportFailure());
        })
      ).pipe(Effect.flip)
    );

    expect(error).toBeInstanceOf(PublicationTargetTransportError);
    expect(attempts).toBe(4);
  });

  it("never retries permanent failures", async () => {
    let attempts = 0;
    const error = await Effect.runPromise(
      retryTransport(
        Effect.suspend(() => {
          attempts += 1;
          return Effect.fail(new Error("permanent-test-failure"));
        })
      ).pipe(Effect.flip)
    );

    expect(error).toEqual(new Error("permanent-test-failure"));
    expect(attempts).toBe(1);
  });

  it("decorates every target operation and retries calls independently", async () => {
    let attempts = 0;
    const target = makeTarget(() =>
      Effect.suspend(() => {
        attempts += 1;
        return attempts === 1
          ? Effect.fail(transportFailure())
          : Effect.succeed({
              active: null,
              candidate: null,
              recovery: null,
            });
      })
    );
    const retried = retryPublicationTarget(target);
    const operationPairs = [
      [retried.abort, target.abort],
      [retried.accept, target.accept],
      [retried.activate, target.activate],
      [retried.activateRecovery, target.activateRecovery],
      [retried.cleanup, target.cleanup],
      [retried.current, target.current],
      [retried.headPage, target.headPage],
      [retried.recovery, target.recovery],
      [retried.rollbackPage, target.rollbackPage],
      [retried.routePage, target.routePage],
      [retried.stageArtifactBatch, target.stageArtifactBatch],
      [retried.stageItemBatch, target.stageItemBatch],
      [retried.stageProjectionBatch, target.stageProjectionBatch],
      [retried.stageRecovery, target.stageRecovery],
      [retried.stageRelease, target.stageRelease],
      [retried.stageRouteBatch, target.stageRouteBatch],
      [retried.stageSnapshot, target.stageSnapshot],
      [retried.stageSnapshotBatch, target.stageSnapshotBatch],
      [retried.status, target.status],
      [retried.verify, target.verify],
    ];

    await expect(Effect.runPromise(retried.current())).resolves.toEqual({
      active: null,
      candidate: null,
      recovery: null,
    });
    expect(attempts).toBe(2);
    expect(
      operationPairs.every(([decorated, original]) => decorated !== original)
    ).toBe(true);
  });
});
