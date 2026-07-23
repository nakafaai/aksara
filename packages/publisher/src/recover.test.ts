import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { ActiveRollbackContentReleaseSchema } from "@nakafa/aksara-contracts/release/current";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Schema } from "effect";
import { describe, expect, it, vi } from "vitest";
import {
  PublicationActivation,
  PublicationActivationError,
  PublicationTarget,
} from "#publisher/publication/spec";
import { recoverContentRelease } from "#publisher/recover";
import { makeTarget } from "#test/lifecycle";
import {
  makeRelease,
  publish,
  testVerificationResolver,
} from "#test/publication";
import { makePublicationTarget } from "#test/target";

/** Publishes one candidate with its verified inverse retained. */
async function makePublished(name: string) {
  const prepared = await makeRelease(name);
  const state = makeTarget(prepared);
  await Effect.runPromise(publish(prepared, state.target));
  const current = await Effect.runPromise(state.target.current());
  const { active, recovery } = current;
  if (!(active && recovery)) {
    return await Effect.runPromise(
      Effect.die("Expected a published release with retained recovery.")
    );
  }
  return {
    input: {
      recoveryId: recovery.release.manifest.releaseId,
      releaseId: active.release.manifest.releaseId,
    },
    recovery,
    state,
  };
}

/** Runs one recovery with explicit runtime trust and renderer preflight. */
function runRecovery(
  input: Parameters<typeof recoverContentRelease>[0],
  target: typeof PublicationTarget.Service,
  verify: typeof PublicationActivation.Service.verify
) {
  return recoverContentRelease(input).pipe(
    Effect.provideService(
      ContentVerificationKeyResolver,
      testVerificationResolver
    ),
    Effect.provideService(
      PublicationActivation,
      PublicationActivation.of({ verify })
    ),
    Effect.provideService(PublicationTarget, target)
  );
}

describe("recoverContentRelease", () => {
  it("revalidates and forward-activates the exact retained inverse", async () => {
    const published = await makePublished("test-recover-active");
    const verify = vi.fn(() => Effect.void);
    const priorActivations = published.state.activate.mock.calls.length;
    const receipt = await Effect.runPromise(
      runRecovery(published.input, published.state.target, verify)
    );

    expect(receipt.releaseId).toBe(published.input.recoveryId);
    expect(verify).toHaveBeenCalledWith(published.recovery.release);
    expect(published.state.activate.mock.calls).toHaveLength(
      priorActivations + 1
    );
    await expect(
      Effect.runPromise(published.state.target.current())
    ).resolves.toMatchObject({
      active: {
        release: { manifest: { releaseId: published.input.recoveryId } },
      },
      candidate: null,
      recovery: null,
    });
  });

  it("returns historical completion after an activation response is lost", async () => {
    const published = await makePublished("test-recover-replay");
    await Effect.runPromise(
      runRecovery(published.input, published.state.target, () => Effect.void)
    );
    const activations = published.state.activate.mock.calls.length;
    const receipt = await Effect.runPromise(
      runRecovery(published.input, published.state.target, () =>
        Effect.die("Historical recovery must not rerun renderer preflight.")
      )
    );

    expect(receipt.releaseId).toBe(published.input.recoveryId);
    expect(published.state.activate.mock.calls).toHaveLength(activations);
  });

  it("does not activate after the live renderer preflight fails", async () => {
    const published = await makePublished("test-recover-renderer");
    const activations = published.state.activate.mock.calls.length;
    const failure = new PublicationActivationError({
      releaseId: published.input.recoveryId,
    });
    await expect(
      Effect.runPromise(
        runRecovery(published.input, published.state.target, () =>
          Effect.fail(failure)
        ).pipe(Effect.flip)
      )
    ).resolves.toEqual(failure);
    expect(published.state.activate.mock.calls).toHaveLength(activations);
  });

  it("rejects historical completion with a foreign receipt", async () => {
    const published = await makePublished("test-recover-receipt");
    await Effect.runPromise(
      runRecovery(published.input, published.state.target, () => Effect.void)
    );
    const current = await Effect.runPromise(published.state.target.current());
    const active = Schema.decodeUnknownSync(ActiveRollbackContentReleaseSchema)(
      current.active
    );
    const target = makePublicationTarget({
      recovery: () =>
        Effect.succeed({
          kind: "completed" as const,
          value: {
            ...active,
            receipt: {
              ...active.receipt,
              manifestHash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
            },
          },
        }),
    });
    await expect(
      Effect.runPromise(
        runRecovery(published.input, target, () => Effect.void).pipe(
          Effect.flip
        )
      )
    ).resolves.toMatchObject({ _tag: "PublicationReceiptMismatchError" });
  });
});
