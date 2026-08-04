import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  ReleaseVerificationCompleteSchema,
  ReleaseVerificationPendingSchema,
} from "@nakafa/aksara-contracts/release";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Fiber, TestClock, TestContext } from "effect";
import { describe, expect, it, vi } from "vitest";
import { stageCandidateRelease } from "#publisher/publication/verification";
import {
  PublicationTargetConflictError,
  PublicationTargetProtocolError,
  PublicationTargetTransportError,
} from "#publisher/target/errors";
import { releaseEvidence } from "#test/lifecycle/state";
import { testVerificationResolver } from "#test/publication/run";
import {
  makeVerificationPlan,
  runVerification,
  verificationBundle,
  verificationManifest,
  verificationReceipt,
  verificationRelease,
} from "#test/verification";

describe("candidate verification", () => {
  it.each([
    ["missing", 1, 1],
    ["staging", 1, 1],
    ["verifying", 0, 1],
    ["verified", 0, 0],
  ] as const)(
    "resumes candidate phase %s",
    async (phase, stageCalls, verifyCalls) => {
      const state = makeVerificationPlan(phase);
      await expect(
        runVerification(stageCandidateRelease(state.plan))
      ).resolves.toEqual({ kind: "verified" });
      expect(state.stageRelease).toHaveBeenCalledWith(verificationBundle);
      expect(state.stage).toHaveBeenCalledTimes(stageCalls);
      expect(state.verify).toHaveBeenCalledTimes(verifyCalls);
    }
  );

  it("polls durable verification without replaying staged rows", async () => {
    let attempts = 0;
    const state = makeVerificationPlan("verifying", {
      verify: () =>
        Effect.sync(() => {
          attempts += 1;
          if (attempts === 1) {
            return ReleaseVerificationPendingSchema.make({
              manifestHash: verificationRelease.manifestHash,
              phase: "verifying",
              releaseId: verificationRelease.manifest.releaseId,
            });
          }
          return ReleaseVerificationCompleteSchema.make({
            evidence: releaseEvidence(verificationRelease),
            phase: "verified",
          });
        }),
    });
    const result = await Effect.runPromise(
      Effect.gen(function* () {
        const fiber = yield* stageCandidateRelease(state.plan).pipe(
          Effect.fork
        );
        yield* TestClock.adjust("1 second");
        return yield* Fiber.join(fiber);
      }).pipe(
        Effect.provideService(
          ContentVerificationKeyResolver,
          testVerificationResolver
        ),
        Effect.provide(TestContext.TestContext)
      )
    );
    expect(result).toEqual({ kind: "verified" });
    expect(attempts).toBe(2);
    expect(state.stage).not.toHaveBeenCalled();
  });

  it("retries transient verification transport failures", async () => {
    let attempts = 0;
    const transport = new PublicationTargetTransportError({
      detail: { reason: "timeout" },
      stage: "verify",
    });
    const state = makeVerificationPlan("verifying", {
      verify: () =>
        Effect.suspend(() => {
          attempts += 1;
          return attempts === 1
            ? Effect.fail(transport)
            : Effect.succeed(
                ReleaseVerificationCompleteSchema.make({
                  evidence: releaseEvidence(verificationRelease),
                  phase: "verified",
                })
              );
        }),
    });
    const result = await Effect.runPromise(
      Effect.gen(function* () {
        const fiber = yield* stageCandidateRelease(state.plan).pipe(
          Effect.fork
        );
        yield* TestClock.adjust("1 second");
        return yield* Fiber.join(fiber);
      }).pipe(
        Effect.provideService(
          ContentVerificationKeyResolver,
          testVerificationResolver
        ),
        Effect.provide(TestContext.TestContext)
      )
    );
    expect(result).toEqual({ kind: "verified" });
    expect(attempts).toBe(2);
    expect(state.stage).not.toHaveBeenCalled();
  });

  it("does not retry permanent verification failures", async () => {
    const protocol = new PublicationTargetProtocolError({
      reason: "response-decoding",
      stage: "verify",
    });
    const verify = vi.fn(() => Effect.fail(protocol));
    const state = makeVerificationPlan("verifying", { verify });
    await expect(
      runVerification(stageCandidateRelease(state.plan).pipe(Effect.flip))
    ).resolves.toEqual(protocol);
    expect(verify).toHaveBeenCalledTimes(1);
    expect(state.stage).not.toHaveBeenCalled();
  });

  it("fails when durable verification exceeds the release SLO", async () => {
    const state = makeVerificationPlan("verifying", {
      verify: () =>
        Effect.succeed(
          ReleaseVerificationPendingSchema.make({
            manifestHash: verificationRelease.manifestHash,
            phase: "verifying",
            releaseId: verificationRelease.manifest.releaseId,
          })
        ),
    });
    const error = await Effect.runPromise(
      stageCandidateRelease(state.plan).pipe(
        Effect.flip,
        TestClock.adjustWith("10 minutes"),
        Effect.provideService(
          ContentVerificationKeyResolver,
          testVerificationResolver
        ),
        Effect.provide(TestContext.TestContext)
      )
    );
    expect(error).toMatchObject({
      _tag: "PublicationVerificationTimeoutError",
      releaseId: verificationRelease.manifest.releaseId,
      timeoutSeconds: 600,
    });
  });

  it("returns an authenticated completed candidate receipt", async () => {
    const state = makeVerificationPlan("completed");
    await expect(
      runVerification(stageCandidateRelease(state.plan))
    ).resolves.toEqual({ kind: "completed", receipt: verificationReceipt });
    expect(state.stage).not.toHaveBeenCalled();
    expect(state.verify).not.toHaveBeenCalled();
  });

  it.each(["aborting", "aborted"] as const)(
    "rejects terminal phase %s",
    async (phase) => {
      const state = makeVerificationPlan(phase);
      const error = await runVerification(
        stageCandidateRelease(state.plan).pipe(Effect.flip)
      );
      expect(error._tag).toBe(
        phase === "aborted"
          ? "PublicationReleaseAbortedError"
          : "PublicationResumePhaseError"
      );
      expect(state.stage).not.toHaveBeenCalled();
    }
  );

  it.each([
    {
      manifestHash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
      releaseId: verificationManifest.releaseId,
    },
    {
      manifestHash: verificationRelease.manifestHash,
      releaseId: ReleaseIdSchema.make("another-release"),
    },
  ])("rejects status for another exact manifest", async (identity) => {
    const state = makeVerificationPlan("staging", {
      status: () => Effect.succeed({ ...identity, phase: "staging" }),
    });
    const error = await runVerification(
      stageCandidateRelease(state.plan).pipe(Effect.flip)
    );
    expect(error._tag).toBe("PublicationStatusMismatchError");
  });

  it("does not resume after immutable envelope staging conflicts", async () => {
    const conflict = new PublicationTargetConflictError({
      conflict: {
        code: "CONTENT_RELEASE_CONFLICT",
        kind: "conflict",
        operation: "stageRelease",
        releaseId: verificationManifest.releaseId,
      },
    });
    const state = makeVerificationPlan("verified", {
      stageRelease: () => Effect.fail(conflict),
    });
    await expect(
      runVerification(stageCandidateRelease(state.plan).pipe(Effect.flip))
    ).resolves.toEqual(conflict);
    expect(state.status).not.toHaveBeenCalled();
  });
});
