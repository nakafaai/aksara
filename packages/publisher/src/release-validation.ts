import type {
  CompiledContentPayload,
  SignedContentArtifact,
} from "@nakafa/aksara-contracts/content";
import {
  ReleaseIdSchema,
  type Sha256Hash,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import type { VerifiedContentProjections } from "@nakafa/aksara-contracts/projection/verify";
import type {
  ContentReleaseItem,
  ContentReleaseManifest,
  PublicationReceipt,
  ReleaseVerificationEvidence,
  SignedContentRelease,
} from "@nakafa/aksara-contracts/release";
import type { VerifiedContentReleaseItems } from "@nakafa/aksara-contracts/release/items";
import type { VerifiedContentRoutes } from "@nakafa/aksara-contracts/release/routes";
import {
  hasSameContentSnapshots,
  snapshotRowCount,
} from "@nakafa/aksara-contracts/release/snapshot";
import type { VerifiedContentSnapshots } from "@nakafa/aksara-contracts/release/snapshot-verify";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { Effect, Schema } from "effect";

/** Signed payloads do not exactly satisfy their authenticated item stream. */
export class ReleaseArtifactMismatchError extends Schema.TaggedError<ReleaseArtifactMismatchError>()(
  "ReleaseArtifactMismatchError",
  { message: Schema.NonEmptyTrimmedString }
) {}

/** Target activation evidence differs from the deterministic release request. */
export class PublicationReceiptMismatchError extends Schema.TaggedError<PublicationReceiptMismatchError>()(
  "PublicationReceiptMismatchError",
  { message: Schema.NonEmptyTrimmedString }
) {}

/** Staged evidence differs from the release and activation must not proceed. */
export class ReleaseVerificationMismatchError extends Schema.TaggedError<ReleaseVerificationMismatchError>()(
  "ReleaseVerificationMismatchError",
  { message: Schema.NonEmptyTrimmedString }
) {}

/** The release was prepared for a different exact Nakafa renderer manifest. */
export class ReleaseRendererManifestMismatchError extends Schema.TaggedError<ReleaseRendererManifestMismatchError>()(
  "ReleaseRendererManifestMismatchError",
  {
    actualHash: Sha256HashSchema,
    expectedHash: Sha256HashSchema,
    releaseId: ReleaseIdSchema,
  }
) {}

/** Requires one deterministic compiler result to match its release item. */
export function validateCompiledPayloadForItem(
  item: ContentReleaseItem,
  artifactHash: Sha256Hash,
  payload: CompiledContentPayload
) {
  const { change } = item;
  const matches =
    change.operation === "upsert" &&
    artifactHash === change.artifactHash &&
    payload.contentKey === change.contentKey &&
    payload.locale === change.locale &&
    payload.rendererDomain === change.rendererDomain;
  if (matches) {
    return Effect.void;
  }
  return Effect.fail(
    new ReleaseArtifactMismatchError({
      message: `Compiled source does not match release item ${item.index}.`,
    })
  );
}

/** Requires one verified artifact to match its exact ordered upsert item. */
export function validateArtifactForItem(
  item: ContentReleaseItem,
  artifact: SignedContentArtifact
) {
  return validateCompiledPayloadForItem(
    item,
    artifact.artifactHash,
    artifact.payload
  );
}

/** Requires the release to target the exact validated renderer manifest. */
export function validateReleaseRendererManifest(
  manifest: ContentReleaseManifest,
  rendererManifest: RendererManifestEnvelope
) {
  if (manifest.rendererManifestHash === rendererManifest.hash) {
    return Effect.void;
  }
  return Effect.fail(
    new ReleaseRendererManifestMismatchError({
      actualHash: rendererManifest.hash,
      expectedHash: manifest.rendererManifestHash,
      releaseId: manifest.releaseId,
    })
  );
}

/** Requires derived structured snapshots to equal the signed release state. */
export function validateReleaseSnapshots(
  manifest: ContentReleaseManifest,
  summary: VerifiedContentSnapshots
) {
  if (
    hasSameContentSnapshots(summary.snapshots, manifest.snapshots) &&
    summary.stagedRows === snapshotRowCount(manifest.snapshots)
  ) {
    return Effect.void;
  }
  return Effect.fail(
    new ReleaseVerificationMismatchError({
      message: "Structured snapshot sources do not match the signed release.",
    })
  );
}

/** Proves the target staged the complete authenticated release before activation. */
export function validateVerificationEvidence(
  release: SignedContentRelease,
  summary: VerifiedContentReleaseItems,
  projectionSummary: VerifiedContentProjections,
  routeSummary: VerifiedContentRoutes,
  snapshotSummary: VerifiedContentSnapshots,
  evidence: ReleaseVerificationEvidence
) {
  const { manifest } = release;
  const matches =
    evidence.releaseId === manifest.releaseId &&
    evidence.manifestHash === release.manifestHash &&
    evidence.baseManifestHash === manifest.baseManifestHash &&
    evidence.baseReleaseId === manifest.baseReleaseId &&
    evidence.baseResultCount === manifest.baseResultCount &&
    evidence.baseResultDigest === manifest.baseResultDigest &&
    evidence.itemCount === manifest.itemCount &&
    evidence.itemsDigest === manifest.itemsDigest &&
    evidence.stagedArtifacts === manifest.upsertCount &&
    evidence.stagedArtifacts === summary.upsertCount &&
    evidence.upsertHeads === manifest.upsertCount &&
    evidence.upsertHeads === summary.upsertCount &&
    evidence.deleteHeads === manifest.deleteCount &&
    evidence.deleteHeads === summary.deleteCount &&
    evidence.rendererContractVersion === manifest.rendererContractVersion &&
    evidence.rendererManifestHash === manifest.rendererManifestHash &&
    evidence.projectionCount === manifest.projectionCount &&
    evidence.projectionCount === projectionSummary.count &&
    evidence.projectionDigest === manifest.projectionDigest &&
    evidence.resultCount === manifest.resultCount &&
    evidence.resultDigest === manifest.resultDigest &&
    evidence.rollbackCount === manifest.rollbackCount &&
    evidence.rollbackDigest === manifest.rollbackDigest &&
    evidence.routeCount === manifest.routeCount &&
    evidence.routeCount === routeSummary.count &&
    evidence.routeDigest === manifest.routeDigest &&
    evidence.stagedRoutes === manifest.routeCount &&
    hasSameContentSnapshots(evidence.snapshots, snapshotSummary.snapshots) &&
    hasSameContentSnapshots(evidence.snapshots, manifest.snapshots) &&
    evidence.stagedSnapshotRows === snapshotSummary.stagedRows;
  if (matches) {
    return Effect.void;
  }
  return Effect.fail(
    new ReleaseVerificationMismatchError({
      message: "Pre-activation evidence does not match the signed release.",
    })
  );
}

/** Requires target evidence to report the exact signed manifest delta. */
export function validateManifestReceipt(
  release: SignedContentRelease,
  receipt: PublicationReceipt
) {
  const { manifest } = release;
  const matches =
    receipt.releaseId === manifest.releaseId &&
    receipt.manifestHash === release.manifestHash &&
    receipt.stagedArtifacts === manifest.upsertCount &&
    receipt.stagedItems === manifest.itemCount &&
    receipt.stagedProjections === manifest.projectionCount &&
    receipt.stagedRoutes === manifest.routeCount &&
    receipt.activatedHeads === manifest.upsertCount &&
    receipt.deletedHeads === manifest.deleteCount &&
    receipt.projectionDigest === manifest.projectionDigest &&
    receipt.resultCount === manifest.resultCount &&
    receipt.resultDigest === manifest.resultDigest &&
    receipt.routeDigest === manifest.routeDigest &&
    hasSameContentSnapshots(receipt.snapshots, manifest.snapshots) &&
    receipt.stagedSnapshotRows === snapshotRowCount(manifest.snapshots);
  if (matches) {
    return Effect.succeed(receipt);
  }
  return Effect.fail(
    new PublicationReceiptMismatchError({
      message: "Publication receipt does not match the signed release delta.",
    })
  );
}

/** Binds target evidence to both the signed manifest and replayed streams. */
export function validatePublicationReceipt(
  release: SignedContentRelease,
  summary: VerifiedContentReleaseItems,
  projectionSummary: VerifiedContentProjections,
  routeSummary: VerifiedContentRoutes,
  snapshotSummary: VerifiedContentSnapshots,
  receipt: PublicationReceipt
) {
  const streamsMatch =
    receipt.stagedArtifacts === summary.upsertCount &&
    receipt.stagedProjections === projectionSummary.count &&
    receipt.stagedRoutes === routeSummary.count &&
    receipt.stagedSnapshotRows === snapshotSummary.stagedRows &&
    hasSameContentSnapshots(receipt.snapshots, snapshotSummary.snapshots) &&
    receipt.activatedHeads === summary.upsertCount &&
    receipt.deletedHeads === summary.deleteCount;
  if (!streamsMatch) {
    return Effect.fail(
      new PublicationReceiptMismatchError({
        message:
          "Publication receipt does not match the replayed release streams.",
      })
    );
  }
  return validateManifestReceipt(release, receipt);
}
