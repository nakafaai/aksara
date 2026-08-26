import { Schema } from "effect";

import { ReleaseIdSchema, Sha256HashSchema } from "#contracts/ids";
import { SignedTryoutRuntimeBundleSchema } from "#contracts/tryout/runtime/spec";

const OutcomeCountSchema = Schema.Literals([0, 1]);

const StageTryoutRuntimeBundleFields = {
  bundle: SignedTryoutRuntimeBundleSchema,
  releaseId: ReleaseIdSchema,
};

/** Requires a staged bundle to identify the release that created its source. */
function hasBoundSourceRelease(input: {
  readonly bundle: typeof SignedTryoutRuntimeBundleSchema.Type;
  readonly releaseId: typeof ReleaseIdSchema.Type;
}) {
  return input.bundle.payload.sourceReleaseId === input.releaseId;
}

/** Canonical input for staging one permanent signed runtime bundle. */
export const StageTryoutRuntimeBundleInputSchema = Schema.Struct(
  StageTryoutRuntimeBundleFields
).pipe(
  Schema.check(
    Schema.makeFilter(hasBoundSourceRelease, {
      message: "Expected the runtime bundle to share its source release.",
    })
  )
);
export type StageTryoutRuntimeBundleInput =
  typeof StageTryoutRuntimeBundleInputSchema.Type;

/** Stages one permanent signed runtime bundle before release verification. */
export const StageTryoutRuntimeBundleRequestSchema = Schema.Struct({
  ...StageTryoutRuntimeBundleFields,
  operation: Schema.Literal("stageTryoutRuntimeBundle"),
}).pipe(
  Schema.check(
    Schema.makeFilter(hasBoundSourceRelease, {
      message: "Expected the runtime bundle to share its source release.",
    })
  )
);
export type StageTryoutRuntimeBundleRequest =
  typeof StageTryoutRuntimeBundleRequestSchema.Type;

/** Idempotent outcome for one content-addressed runtime bundle. */
export const StageTryoutRuntimeBundleReceiptSchema = Schema.Struct({
  bundleHash: Sha256HashSchema,
  created: OutcomeCountSchema,
  releaseId: ReleaseIdSchema,
  snapshotId: Sha256HashSchema,
  unchanged: OutcomeCountSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(({ created, unchanged }) => created + unchanged === 1, {
      message: "Expected exactly one created or unchanged runtime bundle.",
    })
  )
);
export type StageTryoutRuntimeBundleReceipt =
  typeof StageTryoutRuntimeBundleReceiptSchema.Type;
