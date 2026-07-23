import type { PublicationReceipt } from "@nakafa/aksara-contracts/release";
import type { ContentReleaseBundle } from "@nakafa/aksara-contracts/release/lifecycle";
import { verifyContentReleaseBundle } from "@nakafa/aksara-contracts/release/verify";
import type { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect } from "effect";
import { allContentCacheChanges } from "#publisher/cache";
import { validatePublicationStatus } from "#publisher/publication/lifecycle";
import {
  PublicationActivation,
  type PublicationActivationError,
  PublicationReleaseAbortedError,
  PublicationResumePhaseError,
  type PublicationStatusMismatchError,
  PublicationTarget,
} from "#publisher/publication/spec";
import {
  type PublicationReceiptMismatchError,
  validateManifestReceipt,
} from "#publisher/release-validation";
import type { PublicationTargetFailure } from "#publisher/target/errors";

type BundleVerificationError = Effect.Effect.Error<
  ReturnType<typeof verifyContentReleaseBundle>
>;

type ResumeContentReleaseError =
  | BundleVerificationError
  | PublicationActivationError
  | PublicationReceiptMismatchError
  | PublicationReleaseAbortedError
  | PublicationResumePhaseError
  | PublicationStatusMismatchError
  | PublicationTargetFailure;

type ResumeContentRelease = (
  bundle: ContentReleaseBundle
) => Effect.Effect<
  PublicationReceipt,
  ResumeContentReleaseError,
  ContentVerificationKeyResolver | PublicationActivation | PublicationTarget
>;

/** Recovers a terminal receipt and repairs its post-commit cache convergence. */
export const resumeContentRelease: ResumeContentRelease = Effect.fn(
  "AksaraPublisher.resumeContentRelease"
)(function* (bundle: ContentReleaseBundle) {
  const { release } = yield* verifyContentReleaseBundle(bundle);
  const target = yield* PublicationTarget;
  const status = yield* target.status({
    manifestHash: release.manifestHash,
    releaseId: release.manifest.releaseId,
  });
  yield* validatePublicationStatus(release, status);

  if (status.phase === "completed") {
    const receipt = yield* validateManifestReceipt(release, status.receipt);
    const activation = yield* PublicationActivation;
    yield* activation.invalidate({
      cacheChanges: allContentCacheChanges,
      release,
    });
    return receipt;
  }
  if (status.phase === "aborted") {
    return yield* new PublicationReleaseAbortedError({
      manifestHash: release.manifestHash,
      releaseId: release.manifest.releaseId,
    });
  }
  return yield* new PublicationResumePhaseError({
    phase: status.phase,
    releaseId: release.manifest.releaseId,
  });
});
