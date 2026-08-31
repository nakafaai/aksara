import { describe, expect, it } from "@effect/vitest";
import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import { vi } from "vitest";
import {
  activateCandidateRelease,
  verifyCandidateActivation,
} from "#publisher/publication/lifecycle";
import { PublicationActivation } from "#publisher/publication/spec";
import { PublicationStaleBaseError } from "#publisher/target/errors";
import {
  makeVerificationPlan,
  provideVerificationKey,
  verificationBundle,
  verificationManifest,
  verificationReceipt,
  verificationRelease,
} from "#test/verification";

describe("publication lifecycle", () => {
  it.effect("revalidates the live renderer immediately before activation", () =>
    Effect.gen(function* () {
      const verify = vi.fn(() => Effect.void);
      const state = makeVerificationPlan("verified");
      yield* provideVerificationKey(
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
      expect(verify).toHaveBeenCalledWith(verificationBundle, "exact");
    })
  );

  it.effect("validates the atomic activation receipt", () =>
    Effect.gen(function* () {
      const invalidate = vi.fn(() => Effect.void);
      const state = makeVerificationPlan("verified");
      const receipt = yield* provideVerificationKey(
        activateCandidateRelease(state.plan).pipe(
          Effect.provideService(
            PublicationActivation,
            PublicationActivation.of({
              invalidate,
              verify: () => Effect.void,
            })
          )
        )
      );

      expect(receipt).toEqual(verificationReceipt);
      expect(state.activate).toHaveBeenCalledWith(verificationRelease);
      expect(invalidate).toHaveBeenCalledWith(
        expect.objectContaining({ release: verificationRelease })
      );
    })
  );

  it.effect("surfaces a stale base from atomic activation", () =>
    Effect.gen(function* () {
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
      const error = yield* provideVerificationKey(
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
      );

      expect(error).toEqual(failure);
    })
  );
});
