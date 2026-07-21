import type {
  CompiledContentPayload,
  SignedContentArtifact,
} from "@nakafaai/aksara-contracts/content";
import {
  ReleaseIdSchema,
  type Sha256Hash,
  Sha256HashSchema,
} from "@nakafaai/aksara-contracts/ids";
import type {
  ContentReleaseItem,
  ContentReleaseManifest,
  PublicationReceipt,
  ReleaseVerificationEvidence,
} from "@nakafaai/aksara-contracts/release";
import type { VerifiedContentReleaseItems } from "@nakafaai/aksara-contracts/release-items-node";
import type { RendererManifestEnvelope } from "@nakafaai/aksara-contracts/renderer";
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

/** Requires one authored source for every authenticated upsert item. */
export function validateUpsertSourceCount(
  summary: VerifiedContentReleaseItems,
  sourceCount: number
) {
  if (summary.upsertCount === sourceCount) {
    return Effect.void;
  }
  return Effect.fail(
    new ReleaseArtifactMismatchError({
      message: `Expected ${summary.upsertCount} authored sources but received ${sourceCount}.`,
    })
  );
}

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
    payload.locale === change.locale;
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

function projectionCountsMatch(
  expected: ContentReleaseManifest["expectedCounts"],
  actual: ContentReleaseManifest["expectedCounts"]
) {
  return (
    actual.artifacts === expected.artifacts &&
    actual.graphRows === expected.graphRows &&
    actual.heads === expected.heads &&
    actual.llmsDocuments === expected.llmsDocuments &&
    actual.routes === expected.routes &&
    actual.searchRows === expected.searchRows &&
    actual.sitemapEntries === expected.sitemapEntries
  );
}

/** Proves the target staged the complete authenticated release before activation. */
export function validateVerificationEvidence(
  manifest: ContentReleaseManifest,
  summary: VerifiedContentReleaseItems,
  evidence: ReleaseVerificationEvidence
) {
  const matches =
    evidence.releaseId === manifest.releaseId &&
    evidence.baseReleaseId === manifest.baseReleaseId &&
    evidence.itemCount === manifest.itemCount &&
    evidence.itemsDigest === manifest.itemsDigest &&
    evidence.stagedArtifacts === summary.upsertCount &&
    evidence.upsertHeads === summary.upsertCount &&
    evidence.deleteHeads === summary.deleteCount &&
    evidence.rendererContractVersion === manifest.rendererContractVersion &&
    evidence.rendererManifestHash === manifest.rendererManifestHash &&
    evidence.projectionDigest === manifest.expectedDigest &&
    projectionCountsMatch(
      manifest.expectedCounts,
      evidence.recomputedProjectionCounts
    );
  if (matches) {
    return Effect.void;
  }
  return Effect.fail(
    new ReleaseVerificationMismatchError({
      message: "Pre-activation evidence does not match the signed release.",
    })
  );
}

/** Requires atomic activation to report the exact authenticated delta. */
export function validatePublicationReceipt(
  manifest: ContentReleaseManifest,
  summary: VerifiedContentReleaseItems,
  receipt: PublicationReceipt
) {
  const matches =
    receipt.releaseId === manifest.releaseId &&
    receipt.stagedArtifacts === summary.upsertCount &&
    receipt.stagedItems === manifest.itemCount &&
    receipt.activatedHeads === summary.upsertCount &&
    receipt.deletedHeads === summary.deleteCount &&
    receipt.projectionDigest === manifest.expectedDigest;
  if (matches) {
    return Effect.succeed(receipt);
  }
  return Effect.fail(
    new PublicationReceiptMismatchError({
      message: "Publication receipt does not match the signed release delta.",
    })
  );
}
