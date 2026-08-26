import { describe, expect, it } from "@effect/vitest";
import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  ReleaseVerificationCompleteSchema,
  ReleaseVerificationPendingSchema,
} from "@nakafa/aksara-contracts/release";
import { Effect, Fiber } from "effect";
import { TestClock } from "effect/testing";
import { vi } from "vitest";
import { stageCandidateRelease } from "#publisher/publication/verification";
import {
  PublicationTargetConflictError,
  PublicationTargetProtocolError,
  PublicationTargetTransportError,
} from "#publisher/target/errors";
import { releaseEvidence } from "#test/lifecycle/state";
import {
  makeVerificationPlan,
  provideVerificationKey,
  verificationBundle,
  verificationManifest,
  verificationReceipt,
  verificationRelease,
} from "#test/verification";

describe("candidate verification", () => {
  it.effect.each([
    ["missing", 1, 1, 1],
    ["staging", 1, 1, 1],
    ["verifying", 0, 1, 1],
    ["verified", 0, 1, 1],
  ] as const)(
    "resumes candidate phase %s",
    ([phase, stageCalls, runtimeCalls, verifyCalls]) =>
      Effect.gen(function* () {
        const state = makeVerificationPlan(phase);
        const result = yield* provideVerificationKey(
          stageCandidateRelease(state.plan)
        );

        expect(result).toEqual({ kind: "verified" });
        expect(state.stageRelease).toHaveBeenCalledWith(verificationBundle);
        expect(state.stage).toHaveBeenCalledTimes(stageCalls);
        expect(state.runtimes).toHaveBeenCalledTimes(runtimeCalls);
        expect(state.verify).toHaveBeenCalledTimes(verifyCalls);
      })
  );

  it.effect(
    "revalidates target evidence when resuming a verified candidate",
    () =>
      Effect.gen(function* () {
        const verify = vi.fn(() =>
          Effect.succeed(
            ReleaseVerificationCompleteSchema.make({
              evidence: {
                ...releaseEvidence(verificationRelease),
                resultDigest: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
              },
              phase: "verified",
            })
          )
        );
        const state = makeVerificationPlan("verified", { verify });

        const error = yield* provideVerificationKey(
          stageCandidateRelease(state.plan).pipe(Effect.flip)
        );

        expect(error._tag).toBe("ReleaseVerificationMismatchError");
        expect(verify).toHaveBeenCalledOnce();
        expect(state.stage).not.toHaveBeenCalled();
      })
  );

  it.effect("polls durable verification without replaying staged rows", () => {
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
    return provideVerificationKey(
      Effect.gen(function* () {
        const fiber = yield* stageCandidateRelease(state.plan).pipe(
          Effect.forkChild
        );
        yield* Effect.yieldNow;
        yield* TestClock.adjust("1 second");
        const result = yield* Fiber.join(fiber);

        expect(result).toEqual({ kind: "verified" });
        expect(attempts).toBe(2);
        expect(state.stage).not.toHaveBeenCalled();
      })
    );
  });

  it.effect("retries transient verification transport failures", () => {
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
    return provideVerificationKey(
      Effect.gen(function* () {
        const fiber = yield* stageCandidateRelease(state.plan).pipe(
          Effect.forkChild
        );
        yield* Effect.yieldNow;
        yield* TestClock.adjust("1 second");
        const result = yield* Fiber.join(fiber);

        expect(result).toEqual({ kind: "verified" });
        expect(attempts).toBe(2);
        expect(state.stage).not.toHaveBeenCalled();
      })
    );
  });

  it.effect("does not retry permanent verification failures", () =>
    Effect.gen(function* () {
      const protocol = new PublicationTargetProtocolError({
        reason: "response-decoding",
        stage: "verify",
      });
      const verify = vi.fn(() => Effect.fail(protocol));
      const state = makeVerificationPlan("verifying", { verify });
      const error = yield* provideVerificationKey(
        stageCandidateRelease(state.plan).pipe(Effect.flip)
      );

      expect(error).toEqual(protocol);
      expect(verify).toHaveBeenCalledTimes(1);
      expect(state.stage).not.toHaveBeenCalled();
    })
  );

  it.effect("fails when durable verification exceeds the release SLO", () => {
    const state = makeVerificationPlan("verifying", {
      verify: () =>
        Effect.sleep("11 minutes").pipe(
          Effect.as(
            ReleaseVerificationPendingSchema.make({
              manifestHash: verificationRelease.manifestHash,
              phase: "verifying",
              releaseId: verificationRelease.manifest.releaseId,
            })
          )
        ),
    });
    return provideVerificationKey(
      Effect.gen(function* () {
        const fiber = yield* stageCandidateRelease(state.plan).pipe(
          Effect.flip,
          Effect.forkChild
        );
        yield* Effect.yieldNow;
        yield* TestClock.adjust("10 minutes");
        const error = yield* Fiber.join(fiber);

        expect(error).toMatchObject({
          _tag: "PublicationVerificationTimeoutError",
          releaseId: verificationRelease.manifest.releaseId,
          timeoutSeconds: 600,
        });
      })
    );
  });

  it.effect("returns an authenticated completed candidate receipt", () =>
    Effect.gen(function* () {
      const state = makeVerificationPlan("completed");
      const result = yield* provideVerificationKey(
        stageCandidateRelease(state.plan)
      );

      expect(result).toEqual({
        kind: "completed",
        receipt: verificationReceipt,
      });
      expect(state.stage).not.toHaveBeenCalled();
      expect(state.verify).not.toHaveBeenCalled();
    })
  );

  it.effect.each(["aborting", "aborted"] as const)(
    "rejects terminal phase %s",
    (phase) =>
      Effect.gen(function* () {
        const state = makeVerificationPlan(phase);
        const error = yield* provideVerificationKey(
          stageCandidateRelease(state.plan).pipe(Effect.flip)
        );
        expect(error._tag).toBe(
          phase === "aborted"
            ? "PublicationReleaseAbortedError"
            : "PublicationResumePhaseError"
        );
        expect(state.stage).not.toHaveBeenCalled();
      })
  );

  it.effect.each([
    {
      manifestHash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
      releaseId: verificationManifest.releaseId,
    },
    {
      manifestHash: verificationRelease.manifestHash,
      releaseId: ReleaseIdSchema.make("another-release"),
    },
  ])("rejects status for another exact manifest", (identity) =>
    Effect.gen(function* () {
      const state = makeVerificationPlan("staging", {
        status: () => Effect.succeed({ ...identity, phase: "staging" }),
      });
      const error = yield* provideVerificationKey(
        stageCandidateRelease(state.plan).pipe(Effect.flip)
      );
      expect(error._tag).toBe("PublicationStatusMismatchError");
    })
  );

  it.effect("does not resume after immutable envelope staging conflicts", () =>
    Effect.gen(function* () {
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
      const error = yield* provideVerificationKey(
        stageCandidateRelease(state.plan).pipe(Effect.flip)
      );

      expect(error).toEqual(conflict);
      expect(state.status).not.toHaveBeenCalled();
    })
  );
});
