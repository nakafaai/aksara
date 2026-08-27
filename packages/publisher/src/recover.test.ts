import { expect, layer } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { ActiveRollbackContentReleaseSchema } from "@nakafa/aksara-contracts/release/current/evidence";
import { replaceContentSnapshot } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Layer, Schema } from "effect";
import { vi } from "vitest";
import {
  PublicationActivation,
  PublicationActivationError,
  PublicationTarget,
} from "#publisher/publication/spec";
import {
  RecoveryRuntimeMissingError,
  recoverContentRelease,
} from "#publisher/recover";
import { makeTarget } from "#test/lifecycle/spec";
import { makeRelease } from "#test/publication";
import { publish, testVerificationResolver } from "#test/publication/run";
import { makePublicationTarget } from "#test/target";

/** Publishes one candidate with its verified inverse retained. */
const makePublished = Effect.fn("AksaraPublisherTest.makePublished")(function* (
  name: string
) {
  const prepared = yield* Effect.promise(() => makeRelease(name));
  const state = makeTarget(prepared);
  yield* publish(prepared, state.target);
  const current = yield* state.target.current;
  const { active, recovery } = current;
  if (!(active && recovery)) {
    return yield* Effect.die(
      "Expected a published release with retained recovery."
    );
  }
  return {
    active,
    input: {
      recoveryId: recovery.release.manifest.releaseId,
      releaseId: active.release.manifest.releaseId,
    },
    recovery,
    state,
  };
});

/** Runs one recovery with explicit runtime trust and renderer preflight. */
function runRecovery(
  input: Parameters<typeof recoverContentRelease>[0],
  target: typeof PublicationTarget.Service,
  verify: typeof PublicationActivation.Service.verify,
  invalidate: typeof PublicationActivation.Service.invalidate = () =>
    Effect.void
) {
  return recoverContentRelease(input).pipe(
    Effect.provideService(
      PublicationActivation,
      PublicationActivation.of({ invalidate, verify })
    ),
    Effect.provideService(PublicationTarget, target)
  );
}

layer(Layer.succeed(ContentVerificationKeyResolver, testVerificationResolver))(
  "recoverContentRelease",
  (it) => {
    it.effect(
      "revalidates and forward-activates the exact retained inverse",
      () =>
        Effect.gen(function* () {
          const published = yield* makePublished("test-recover-active");
          const verify = vi.fn(() => Effect.void);
          const invalidate = vi.fn(() => Effect.void);
          const priorActivations = published.state.activate.mock.calls.length;
          const receipt = yield* runRecovery(
            published.input,
            published.state.target,
            verify,
            invalidate
          );

          expect(receipt.releaseId).toBe(published.input.recoveryId);
          expect(verify).toHaveBeenCalledWith(published.recovery.release);
          expect(invalidate).toHaveBeenCalledWith(
            expect.objectContaining({ release: published.recovery.release })
          );
          expect(published.state.activate.mock.calls).toHaveLength(
            priorActivations + 1
          );
          const current = yield* published.state.target.current;
          expect(current).toMatchObject({
            active: {
              release: { manifest: { releaseId: published.input.recoveryId } },
            },
            candidate: null,
            recovery: null,
          });
        })
    );

    it.effect(
      "repairs failed cache convergence through historical completion",
      () =>
        Effect.gen(function* () {
          const published = yield* makePublished("test-recover-replay");
          const failure = new PublicationActivationError({
            phase: "cache",
            releaseId: published.input.recoveryId,
          });
          const invalidate = vi
            .fn<() => Effect.Effect<void, PublicationActivationError>>()
            .mockReturnValueOnce(Effect.fail(failure))
            .mockReturnValue(Effect.void);
          const firstFailure = yield* runRecovery(
            published.input,
            published.state.target,
            () => Effect.void,
            invalidate
          ).pipe(Effect.flip);
          expect(firstFailure).toEqual(failure);
          const activations = published.state.activate.mock.calls.length;
          const receipt = yield* runRecovery(
            published.input,
            published.state.target,
            () =>
              Effect.die(
                "Historical recovery must not rerun renderer preflight."
              ),
            invalidate
          );

          expect(receipt.releaseId).toBe(published.input.recoveryId);
          expect(invalidate).toHaveBeenCalledWith(
            expect.objectContaining({ release: published.recovery.release })
          );
          expect(invalidate).toHaveBeenCalledTimes(2);
          expect(published.state.activate.mock.calls).toHaveLength(activations);
        })
    );

    it.effect("rejects a retained try-out inverse without its runtime", () =>
      Effect.gen(function* () {
        const published = yield* makePublished("test-recover-runtime");
        const current = yield* published.state.target.current;
        if (!current.recovery) {
          return yield* Effect.die("Expected one retained recovery fixture.");
        }
        const snapshotId = Sha256HashSchema.make(`sha256:${"e".repeat(64)}`);
        const target = makePublicationTarget({
          current: Effect.succeed({
            ...current,
            recovery: {
              ...current.recovery,
              release: {
                ...current.recovery.release,
                manifest: {
                  ...current.recovery.release.manifest,
                  snapshots: {
                    ...current.recovery.release.manifest.snapshots,
                    tryout: replaceContentSnapshot({
                      baseSnapshotId: null,
                      resultSnapshotId: snapshotId,
                      rowCount: 1,
                      rowDigest: snapshotId,
                    }),
                  },
                },
              },
            },
            tryoutRuntimeBundle: null,
          }),
          recovery: published.state.target.recovery,
        });
        const verify = vi.fn(() => Effect.void);

        const failure = yield* runRecovery(
          published.input,
          target,
          verify
        ).pipe(Effect.flip);

        expect(failure).toBeInstanceOf(RecoveryRuntimeMissingError);
        expect(verify).not.toHaveBeenCalled();
      })
    );

    it.effect("does not activate after the live renderer preflight fails", () =>
      Effect.gen(function* () {
        const published = yield* makePublished("test-recover-renderer");
        const activations = published.state.activate.mock.calls.length;
        const failure = new PublicationActivationError({
          phase: "preflight",
          releaseId: published.input.recoveryId,
        });
        const error = yield* runRecovery(
          published.input,
          published.state.target,
          () => Effect.fail(failure)
        ).pipe(Effect.flip);
        expect(error).toEqual(failure);
        expect(published.state.activate.mock.calls).toHaveLength(activations);
      })
    );

    it.effect("rejects historical completion with a foreign receipt", () =>
      Effect.gen(function* () {
        const published = yield* makePublished("test-recover-receipt");
        yield* runRecovery(
          published.input,
          published.state.target,
          () => Effect.void
        );
        const current = yield* published.state.target.current;
        const active = yield* Schema.decodeUnknownEffect(
          ActiveRollbackContentReleaseSchema
        )(current.active);
        const target = makePublicationTarget({
          recovery: () =>
            Effect.succeed({
              kind: "completed" as const,
              value: {
                ...active,
                receipt: {
                  ...active.receipt,
                  manifestHash: Sha256HashSchema.make(
                    `sha256:${"f".repeat(64)}`
                  ),
                },
              },
            }),
        });
        const invalidate = vi.fn(() => Effect.void);
        const error = yield* runRecovery(
          published.input,
          target,
          () => Effect.void,
          invalidate
        ).pipe(Effect.flip);
        expect(error).toMatchObject({
          _tag: "PublicationReceiptMismatchError",
        });
        expect(invalidate).not.toHaveBeenCalled();
      })
    );
  }
);
