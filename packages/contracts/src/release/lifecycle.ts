import { Schema } from "effect";
import { ReleaseIdSchema, Sha256HashSchema } from "#contracts/ids";
import {
  PublicationReceiptSchema,
  SignedContentReleaseSchema,
} from "#contracts/release/spec";
import { RendererManifestEnvelopeSchema } from "#contracts/renderer/contract";

const CleanupCountSchema = Schema.Number.pipe(
  Schema.int(),
  Schema.nonNegative()
);

/** Maximum rows the backend may delete in one cleanup transaction. */
export const MAX_CLEANUP_PAGE_COUNT = 100;

const CleanupRetrySchema = Schema.Number.pipe(
  Schema.int(),
  Schema.nonNegative(),
  Schema.finite()
);

/** Exact immutable release identity requested from durable target state. */
export const ContentReleaseStatusRequestSchema = Schema.Struct({
  manifestHash: Sha256HashSchema,
  releaseId: ReleaseIdSchema,
});
export type ContentReleaseStatusRequest =
  typeof ContentReleaseStatusRequestSchema.Type;

/** Frozen renderer and signed release required for exact crash recovery. */
export const ContentReleaseBundleSchema = Schema.Struct({
  release: SignedContentReleaseSchema,
  rendererManifest: RendererManifestEnvelopeSchema,
}).pipe(
  Schema.filter(
    (bundle) =>
      bundle.release.manifest.rendererManifestHash ===
        bundle.rendererManifest.hash &&
      bundle.release.manifest.rendererContractVersion ===
        bundle.rendererManifest.rendererContractVersion,
    {
      message: () =>
        "Expected the signed release to bind the frozen renderer envelope.",
    }
  )
);
export type ContentReleaseBundle = typeof ContentReleaseBundleSchema.Type;

/** Checks terminal receipt counts against its signed immutable manifest. */
function hasBoundCompletedReceipt(input: {
  readonly receipt: typeof PublicationReceiptSchema.Type;
  readonly release: typeof SignedContentReleaseSchema.Type;
}) {
  const { manifest } = input.release;
  const { receipt } = input;
  return (
    receipt.releaseId === manifest.releaseId &&
    receipt.manifestHash === input.release.manifestHash &&
    receipt.stagedArtifacts === manifest.upsertCount &&
    receipt.stagedItems === manifest.itemCount &&
    receipt.stagedProjections === manifest.projectionCount &&
    receipt.projectionDigest === manifest.projectionDigest &&
    receipt.resultCount === manifest.resultCount &&
    receipt.resultDigest === manifest.resultDigest
  );
}

/** Exact completed active release retained for lost-response recovery. */
export const CompletedContentReleaseSchema = Schema.extend(
  ContentReleaseBundleSchema,
  Schema.Struct({ receipt: PublicationReceiptSchema })
).pipe(
  Schema.filter(hasBoundCompletedReceipt, {
    message: () =>
      "Expected the completed receipt to match its signed release manifest.",
  })
);
export type CompletedContentRelease = typeof CompletedContentReleaseSchema.Type;

const PendingReleasePhaseSchema = Schema.Literal(
  "staging",
  "verifying",
  "verified",
  "active",
  "finalizing",
  "aborting"
);

/** Exact durable release bundle currently owning the singleton pending slot. */
export const PendingContentReleaseSchema = Schema.extend(
  ContentReleaseBundleSchema,
  Schema.Struct({ phase: PendingReleasePhaseSchema })
);
export type PendingContentRelease = typeof PendingContentReleaseSchema.Type;

/** Checks active identity against the pending release's durable phase. */
function hasCoherentCurrentState(input: {
  readonly activeManifestHash: typeof Sha256HashSchema.Type | null;
  readonly activeReleaseId: typeof ReleaseIdSchema.Type | null;
  readonly completed: CompletedContentRelease | null;
  readonly pending: PendingContentRelease | null;
}) {
  if (
    (input.activeReleaseId === null) !==
    (input.activeManifestHash === null)
  ) {
    return false;
  }
  if (input.pending === null) {
    if (input.activeReleaseId === null) {
      return input.completed === null;
    }
    return (
      input.completed !== null &&
      input.completed.release.manifest.releaseId === input.activeReleaseId &&
      input.completed.release.manifestHash === input.activeManifestHash
    );
  }
  if (input.completed !== null) {
    return false;
  }
  const { manifest } = input.pending.release;
  if (
    input.pending.phase === "active" ||
    input.pending.phase === "finalizing"
  ) {
    return (
      input.activeReleaseId === manifest.releaseId &&
      input.activeManifestHash === input.pending.release.manifestHash
    );
  }
  return (
    input.activeReleaseId === manifest.baseReleaseId &&
    input.activeManifestHash === manifest.baseManifestHash
  );
}

/** Authoritative singleton publication state used before release preparation. */
export const ContentReleaseCurrentSchema = Schema.Struct({
  activeManifestHash: Schema.NullOr(Sha256HashSchema),
  activeReleaseId: Schema.NullOr(ReleaseIdSchema),
  completed: Schema.NullOr(CompletedContentReleaseSchema),
  pending: Schema.NullOr(PendingContentReleaseSchema),
}).pipe(
  Schema.filter(hasCoherentCurrentState, {
    message: () =>
      "Expected active and pending publication identities to be coherent.",
  })
);
export type ContentReleaseCurrent = typeof ContentReleaseCurrentSchema.Type;

const ContentReleaseStatusIdentity = {
  manifestHash: Sha256HashSchema,
  releaseId: ReleaseIdSchema,
};

/** Checks completed evidence against the durable status identity. */
function hasBoundReceipt(status: {
  readonly receipt: typeof PublicationReceiptSchema.Type;
  readonly releaseId: typeof ReleaseIdSchema.Type;
}) {
  return status.receipt.releaseId === status.releaseId;
}

const CompletedReleaseStatusSchema = Schema.Struct({
  phase: Schema.Literal("completed"),
  receipt: PublicationReceiptSchema,
  ...ContentReleaseStatusIdentity,
}).pipe(
  Schema.filter(hasBoundReceipt, {
    message: () =>
      "Expected the completed receipt to match the release status identity.",
  })
);

/** Persisted release phase bound to one exact signed manifest identity. */
export const ContentReleaseStatusSchema = Schema.Union(
  Schema.Struct({
    phase: Schema.Literal("missing"),
    ...ContentReleaseStatusIdentity,
  }),
  Schema.Struct({
    phase: Schema.Literal(
      "staging",
      "verifying",
      "verified",
      "active",
      "aborting",
      "finalizing",
      "aborted"
    ),
    ...ContentReleaseStatusIdentity,
  }),
  CompletedReleaseStatusSchema
);
export type ContentReleaseStatus = typeof ContentReleaseStatusSchema.Type;

/** One invisible release whose pending candidate state should be abandoned. */
export const ReleaseAbortRequestSchema = Schema.Struct({
  releaseId: ReleaseIdSchema,
});
export type ReleaseAbortRequest = typeof ReleaseAbortRequestSchema.Type;

/** Checks cumulative abort evidence against its durable total. */
function hasCoherentAbortReceipt(receipt: {
  readonly complete: boolean;
  readonly processedItems: number;
  readonly totalItems: number;
}) {
  return (
    receipt.processedItems <= receipt.totalItems &&
    receipt.complete === (receipt.processedItems === receipt.totalItems)
  );
}

/** Durable cumulative evidence from one server-owned abort page. */
export const ReleaseAbortReceiptSchema = Schema.Struct({
  complete: Schema.Boolean,
  processedItems: CleanupCountSchema,
  releaseId: ReleaseIdSchema,
  totalItems: CleanupCountSchema,
}).pipe(
  Schema.filter(hasCoherentAbortReceipt, {
    message: () =>
      "Expected abort progress to match its durable release item total.",
  })
);
export type ReleaseAbortReceipt = typeof ReleaseAbortReceiptSchema.Type;

/** One release whose unreachable rows should advance through server-owned state. */
export const ReleaseCleanupRequestSchema = Schema.Struct({
  releaseId: ReleaseIdSchema,
});
export type ReleaseCleanupRequest = typeof ReleaseCleanupRequestSchema.Type;

/** Durable cumulative evidence returned after server-owned cleanup progress. */
export const ReleaseCleanupReceiptSchema = Schema.Struct({
  complete: Schema.Boolean,
  deletedArtifacts: CleanupCountSchema,
  deletedItems: CleanupCountSchema,
  releaseId: ReleaseIdSchema,
  retryAt: Schema.optional(CleanupRetrySchema),
}).pipe(
  Schema.filter(
    (receipt) => !(receipt.complete && receipt.retryAt !== undefined),
    {
      message: () =>
        "Expected completed cleanup evidence without a retry timestamp.",
    }
  )
);
export type ReleaseCleanupReceipt = typeof ReleaseCleanupReceiptSchema.Type;
