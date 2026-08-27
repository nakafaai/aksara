import { describe, expect, it } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import type { ContentReleaseStatus } from "@nakafa/aksara-contracts/release/lifecycle";
import { snapshotRowCount } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect } from "effect";
import { vi } from "vitest";
import {
  PublicationActivation,
  PublicationActivationError,
  PublicationTarget,
} from "#publisher/publication/spec";
import { resumeContentRelease } from "#publisher/resume";
import {
  makeSignedBundle,
  testVerificationResolver,
} from "#test/publication/run";
import { makePublicationTarget } from "#test/target";

type ResumeBundle = Awaited<ReturnType<typeof makeSignedBundle>>;

/** Derives the exact terminal receipt represented by one signed fixture. */
function makeReceipt(bundle: ResumeBundle) {
  const { manifest } = bundle.release;
  return {
    activatedHeads: manifest.upsertCount,
    activeAppLocales: manifest.activeAppLocales,
    deletedHeads: manifest.deleteCount,
    manifestHash: bundle.release.manifestHash,
    projectionDigest: manifest.projectionDigest,
    releaseId: manifest.releaseId,
    resultCount: manifest.resultCount,
    resultDigest: manifest.resultDigest,
    routeDigest: manifest.routeDigest,
    snapshots: manifest.snapshots,
    stagedArtifacts: manifest.upsertCount,
    stagedItems: manifest.itemCount,
    stagedProjections: manifest.projectionCount,
    stagedRoutes: manifest.routeCount,
    stagedSnapshotRows: snapshotRowCount(manifest.snapshots),
  };
}

interface ResumeFixture {
  readonly bundle: ResumeBundle;
  readonly receipt: ReturnType<typeof makeReceipt>;
}

/** Builds one isolated signed resume fixture inside the Effect test runtime. */
const makeResumeFixture = Effect.fn("AksaraPublisher.test.makeResumeFixture")(
  function* () {
    const bundle = yield* Effect.promise(() => makeSignedBundle("test-resume"));
    return { bundle, receipt: makeReceipt(bundle) } satisfies ResumeFixture;
  }
);

/** Creates an exact durable status for one recovery test phase. */
function statusFor(
  fixture: ResumeFixture,
  phase: ContentReleaseStatus["phase"],
  storedReceipt = fixture.receipt
): ContentReleaseStatus {
  const { manifest } = fixture.bundle.release;
  const identity = {
    manifestHash: fixture.bundle.release.manifestHash,
    releaseId: manifest.releaseId,
  };
  return phase === "completed"
    ? { ...identity, phase, receipt: storedReceipt }
    : { ...identity, phase };
}

/** Creates a complete target that exposes only status and activation. */
function makeTarget(
  fixture: ResumeFixture,
  phase: ContentReleaseStatus["phase"],
  activatedReceipt = fixture.receipt
) {
  const activate = vi.fn(() => Effect.succeed(activatedReceipt));
  const target = makePublicationTarget({
    activate,
    status: () => Effect.succeed(statusFor(fixture, phase, activatedReceipt)),
  });
  return { activate, target };
}

/** Runs one stored release through its real signature resolver. */
function runResume(
  fixture: ResumeFixture,
  target: typeof PublicationTarget.Service,
  invalidate: typeof PublicationActivation.Service.invalidate = () =>
    Effect.void
) {
  return resumeContentRelease(fixture.bundle).pipe(
    Effect.provideService(
      ContentVerificationKeyResolver,
      testVerificationResolver
    ),
    Effect.provideService(
      PublicationActivation,
      PublicationActivation.of({ invalidate, verify: () => Effect.void })
    ),
    Effect.provideService(PublicationTarget, target)
  );
}

describe("resumeContentRelease", () => {
  it.effect("returns a bound terminal receipt without activating again", () =>
    Effect.gen(function* () {
      const fixture = yield* makeResumeFixture();
      const state = makeTarget(fixture, "completed");
      const invalidate = vi.fn(() => Effect.void);
      const result = yield* runResume(fixture, state.target, invalidate);

      expect(result).toEqual(fixture.receipt);
      expect(state.activate).not.toHaveBeenCalled();
      expect(invalidate).toHaveBeenCalledWith(
        expect.objectContaining({ release: fixture.bundle.release })
      );
    })
  );

  it.effect("repairs a failed terminal cache invalidation on exact retry", () =>
    Effect.gen(function* () {
      const fixture = yield* makeResumeFixture();
      const state = makeTarget(fixture, "completed");
      const failure = new PublicationActivationError({
        phase: "cache",
        releaseId: fixture.bundle.release.manifest.releaseId,
      });
      const invalidate = vi
        .fn<() => Effect.Effect<void, PublicationActivationError>>()
        .mockReturnValueOnce(Effect.fail(failure))
        .mockReturnValue(Effect.void);

      const error = yield* runResume(fixture, state.target, invalidate).pipe(
        Effect.flip
      );
      const result = yield* runResume(fixture, state.target, invalidate);

      expect(error).toEqual(failure);
      expect(result).toEqual(fixture.receipt);
      expect(state.activate).not.toHaveBeenCalled();
      expect(invalidate).toHaveBeenCalledTimes(2);
    })
  );

  it.effect("rejects an aborted release with its immutable identity", () =>
    Effect.gen(function* () {
      const fixture = yield* makeResumeFixture();
      const state = makeTarget(fixture, "aborted");
      const error = yield* runResume(fixture, state.target).pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "PublicationReleaseAbortedError",
        manifestHash: fixture.bundle.release.manifestHash,
        releaseId: fixture.bundle.release.manifest.releaseId,
      });
      expect(state.activate).not.toHaveBeenCalled();
    })
  );

  it.effect.each([
    "missing",
    "staging",
    "verifying",
    "verified",
    "aborting",
  ] as const)("rejects non-activatable %s state", (phase) =>
    Effect.gen(function* () {
      const fixture = yield* makeResumeFixture();
      const state = makeTarget(fixture, phase);
      const error = yield* runResume(fixture, state.target).pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "PublicationResumePhaseError",
        phase,
        releaseId: fixture.bundle.release.manifest.releaseId,
      });
      expect(state.activate).not.toHaveBeenCalled();
    })
  );

  it.effect(
    "rejects a final receipt that differs from the signed manifest",
    () =>
      Effect.gen(function* () {
        const fixture = yield* makeResumeFixture();
        const invalidate = vi.fn(() => Effect.void);
        const state = makeTarget(fixture, "completed", {
          ...fixture.receipt,
          projectionDigest: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
        });
        const error = yield* runResume(fixture, state.target, invalidate).pipe(
          Effect.flip
        );

        expect(error).toMatchObject({
          _tag: "PublicationReceiptMismatchError",
        });
        expect(invalidate).not.toHaveBeenCalled();
      })
  );
});
