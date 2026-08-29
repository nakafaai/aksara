import { describe, expect, it } from "@effect/vitest";
import { PublicationTarget } from "@nakafa/aksara-publisher/publication/spec";
import { PublicationTargetTransportError } from "@nakafa/aksara-publisher/target/errors";
import { Data, Effect, Fiber } from "effect";
import { TestClock } from "effect/testing";
import { retryPublicationTarget, retryTransport } from "#cli/retry";

/** Test-only typed failure that must bypass transient transport retries. */
class TestPermanentFailure extends Data.TaggedError("TestPermanentFailure") {}

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
    stageGroup: unused,
    stageItemBatch: unused,
    stageProjectionBatch: unused,
    stageRecovery: unused,
    stageRelease: unused,
    stageRouteBatch: unused,
    stageSnapshot: unused,
    stageSnapshotBatch: unused,
    stageTryoutRuntimeBundle: unused,
    status: unused,
    verify: unused,
  });
}

/** Advances the virtual clock through the complete bounded retry schedule. */
const runRetries = Effect.fn("AksaraCliTest.runRetries")(function* <A, E>(
  program: Effect.Effect<A, E>
) {
  const fiber = yield* Effect.forkChild(program);
  yield* TestClock.adjust(1000);
  return yield* Fiber.join(fiber);
});

describe("publication transport retry", () => {
  it.effect(
    "retries transient failures and preserves the eventual result",
    () =>
      Effect.gen(function* () {
        let attempts = 0;
        const result = yield* runRetries(
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
      })
  );

  it.effect("stops after three bounded retries", () =>
    Effect.gen(function* () {
      let attempts = 0;
      const error = yield* runRetries(
        retryTransport(
          Effect.suspend(() => {
            attempts += 1;
            return Effect.fail(transportFailure());
          })
        ).pipe(Effect.flip)
      );

      expect(error).toBeInstanceOf(PublicationTargetTransportError);
      expect(attempts).toBe(4);
    })
  );

  it.effect("never retries permanent failures", () =>
    Effect.gen(function* () {
      let attempts = 0;
      const failure = new TestPermanentFailure();
      const error = yield* retryTransport(
        Effect.suspend(() => {
          attempts += 1;
          return Effect.fail(failure);
        })
      ).pipe(Effect.flip);

      expect(error).toBe(failure);
      expect(attempts).toBe(1);
    })
  );

  it.effect(
    "decorates every target operation and retries calls independently",
    () =>
      Effect.gen(function* () {
        let attempts = 0;
        const target = makeTarget(
          Effect.suspend(() => {
            attempts += 1;
            return attempts === 1
              ? Effect.fail(transportFailure())
              : Effect.succeed({
                  active: null,
                  candidate: null,
                  recovery: null,
                  tryoutRuntimeBundle: null,
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
          [retried.stageGroup, target.stageGroup],
          [retried.stageItemBatch, target.stageItemBatch],
          [retried.stageProjectionBatch, target.stageProjectionBatch],
          [retried.stageRecovery, target.stageRecovery],
          [retried.stageRelease, target.stageRelease],
          [retried.stageRouteBatch, target.stageRouteBatch],
          [retried.stageSnapshot, target.stageSnapshot],
          [retried.stageSnapshotBatch, target.stageSnapshotBatch],
          [retried.stageTryoutRuntimeBundle, target.stageTryoutRuntimeBundle],
          [retried.status, target.status],
          [retried.verify, target.verify],
        ];

        expect(yield* runRetries(retried.current)).toEqual({
          active: null,
          candidate: null,
          recovery: null,
          tryoutRuntimeBundle: null,
        });
        expect(attempts).toBe(2);
        expect(
          operationPairs.every(
            ([decorated, original]) => decorated !== original
          )
        ).toBe(true);
      })
  );
});
