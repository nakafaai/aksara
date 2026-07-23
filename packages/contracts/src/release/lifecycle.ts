import { Schema } from "effect";
import { ReleaseIdSchema, Sha256HashSchema } from "#contracts/ids";
import {
  PublicationReceiptSchema,
  type RollbackSignedContentRelease,
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

/** Frozen renderer plus one signed rollback release at recovery boundaries. */
export type RollbackContentReleaseBundle = ContentReleaseBundle & {
  readonly release: RollbackSignedContentRelease;
};

/** Exact renderer-bound bundle accepted only for recovery publication. */
export const RollbackContentReleaseBundleSchema =
  ContentReleaseBundleSchema.pipe(
    Schema.filter(
      (bundle): bundle is RollbackContentReleaseBundle =>
        bundle.release.manifest.origin.kind === "rollback",
      { message: () => "Expected a renderer-bound rollback release." }
    )
  );

const ContentReleaseStatusIdentity = {
  manifestHash: Sha256HashSchema,
  releaseId: ReleaseIdSchema,
};

/** Checks completed evidence against the durable status identity. */
function hasBoundReceipt(status: {
  readonly manifestHash: typeof Sha256HashSchema.Type;
  readonly receipt: typeof PublicationReceiptSchema.Type;
  readonly releaseId: typeof ReleaseIdSchema.Type;
}) {
  return (
    status.receipt.releaseId === status.releaseId &&
    status.receipt.manifestHash === status.manifestHash
  );
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
      "aborting",
      "aborted"
    ),
    ...ContentReleaseStatusIdentity,
  }),
  CompletedReleaseStatusSchema
);
export type ContentReleaseStatus = typeof ContentReleaseStatusSchema.Type;

/** One invisible staged release whose rows should be abandoned. */
export const ReleaseAbortRequestSchema = Schema.Struct({
  releaseId: ReleaseIdSchema,
});
export type ReleaseAbortRequest = typeof ReleaseAbortRequestSchema.Type;

/** Identifies the active release and retained inverse accepted by an operator. */
export const ReleaseAcceptRequestSchema = Schema.Struct({
  recoveryId: ReleaseIdSchema,
  releaseId: ReleaseIdSchema,
}).pipe(
  Schema.filter((request) => request.recoveryId !== request.releaseId, {
    message: () => "Expected distinct active and recovery release identities.",
  })
);
export type ReleaseAcceptRequest = typeof ReleaseAcceptRequestSchema.Type;

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
