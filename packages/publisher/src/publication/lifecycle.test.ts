import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import { describe, expect, it, vi } from "vitest";
import {
  activateCandidateRelease,
  verifyCandidateActivation,
} from "#publisher/publication/lifecycle";
import { PublicationActivation } from "#publisher/publication/spec";
import { PublicationStaleBaseError } from "#publisher/target/errors";
import {
  makeVerificationPlan,
  runVerification,
  verificationManifest,
  verificationReceipt,
  verificationRelease,
} from "#test/verification";

describe("publication lifecycle", () => {
  it("revalidates the live renderer immediately before activation", async () => {
    const verify = vi.fn(() => Effect.void);
    const state = makeVerificationPlan("verified");
    await runVerification(
      verifyCandidateActivation(state.plan).pipe(
        Effect.provideService(
          PublicationActivation,
          PublicationActivation.of({
            invalidate: () => Effect.void,
            verify,
          })
        )
      )
    );
    expect(verify).toHaveBeenCalledWith(verificationRelease);
  });

  it("validates the atomic activation receipt", async () => {
    const invalidate = vi.fn(() => Effect.void);
    const state = makeVerificationPlan("verified");
    await expect(
      runVerification(
        activateCandidateRelease(state.plan).pipe(
          Effect.provideService(
            PublicationActivation,
            PublicationActivation.of({
              invalidate,
              verify: () => Effect.void,
            })
          )
        )
      )
    ).resolves.toEqual(verificationReceipt);
    expect(state.activate).toHaveBeenCalledWith(verificationRelease);
    expect(invalidate).toHaveBeenCalledWith(
      expect.objectContaining({ release: verificationRelease })
    );
  });

  it("surfaces a stale base from atomic activation", async () => {
    const failure = new PublicationStaleBaseError({
      failure: {
        activeReleaseId: ReleaseIdSchema.make("another-release"),
        code: "CONTENT_RELEASE_STALE_BASE",
        expectedBaseReleaseId: null,
        kind: "stale-base",
        operation: "activate",
        releaseId: verificationManifest.releaseId,
      },
    });
    const state = makeVerificationPlan("verified", {
      activate: () => Effect.fail(failure),
    });
    await expect(
      runVerification(
        activateCandidateRelease(state.plan).pipe(
          Effect.provideService(
            PublicationActivation,
            PublicationActivation.of({
              invalidate: () => Effect.void,
              verify: () => Effect.void,
            })
          ),
          Effect.flip
        )
      )
    ).resolves.toEqual(failure);
  });
});
