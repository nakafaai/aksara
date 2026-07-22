import type { PublicationReceipt } from "@nakafa/aksara-contracts/release";
import type { ContentReleaseBundle } from "@nakafa/aksara-contracts/release/lifecycle";
import { verifyContentReleaseBundle } from "@nakafa/aksara-contracts/release/verify";
import type { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect } from "effect";
import { validatePublicationStatus } from "#publisher/publication/lifecycle";
import {
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
  ContentVerificationKeyResolver | PublicationTarget
>;

/** Finishes one authenticated release without recompiling changed source. */
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
    return yield* validateManifestReceipt(release, status.receipt);
  }
  if (status.phase === "active" || status.phase === "finalizing") {
    const receipt = yield* target.finalize(release);
    return yield* validateManifestReceipt(release, receipt);
  }
  if (status.phase === "verified") {
    const activated = yield* target.activate(release);
    yield* validateManifestReceipt(release, activated);
    const finalized = yield* target.finalize(release);
    return yield* validateManifestReceipt(release, finalized);
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
