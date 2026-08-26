import { Schema } from "effect";

import {
  type ContentReleaseBundle,
  ContentReleaseBundleSchema,
  type RollbackContentReleaseBundle,
} from "#contracts/release/lifecycle";
import {
  hasSameContentSnapshots,
  snapshotRowCount,
} from "#contracts/release/snapshot/spec";
import { PublicationReceiptSchema } from "#contracts/release/spec";

/** Compares canonical signed locale lists without erasing their role. */
export function hasSameAppLocales(
  left: readonly string[],
  right: readonly string[]
) {
  return (
    left.length === right.length &&
    left.every((locale, index) => locale === right[index])
  );
}

/** Checks terminal receipt counts against its signed immutable manifest. */
function hasBoundCompletedReceipt(input: {
  readonly receipt: typeof PublicationReceiptSchema.Type;
  readonly release: ContentReleaseBundle["release"];
}) {
  const { manifest } = input.release;
  const { receipt } = input;
  return (
    receipt.releaseId === manifest.releaseId &&
    hasSameAppLocales(receipt.activeAppLocales, manifest.activeAppLocales) &&
    receipt.manifestHash === input.release.manifestHash &&
    receipt.stagedArtifacts === manifest.upsertCount &&
    receipt.stagedItems === manifest.itemCount &&
    receipt.stagedProjections === manifest.projectionCount &&
    receipt.projectionDigest === manifest.projectionDigest &&
    receipt.resultCount === manifest.resultCount &&
    receipt.resultDigest === manifest.resultDigest &&
    receipt.routeDigest === manifest.routeDigest &&
    receipt.stagedRoutes === manifest.routeCount &&
    hasSameContentSnapshots(receipt.snapshots, manifest.snapshots) &&
    receipt.stagedSnapshotRows === snapshotRowCount(manifest.snapshots)
  );
}

/** Exact active release retained for base selection and crash recovery. */
export const ActiveContentReleaseSchema = ContentReleaseBundleSchema.mapFields(
  (fields) => ({ ...fields, receipt: PublicationReceiptSchema }),
  { unsafePreserveChecks: true }
).pipe(
  Schema.check(
    Schema.makeFilter(hasBoundCompletedReceipt, {
      message:
        "Expected the active receipt to match its signed release manifest.",
    })
  )
);
export type ActiveContentRelease = typeof ActiveContentReleaseSchema.Type;

/** Completed active release known to carry rollback provenance. */
export type ActiveRollbackContentRelease = ActiveContentRelease &
  RollbackContentReleaseBundle;

/** Historical terminal release accepted only when it is a rollback. */
export const ActiveRollbackContentReleaseSchema =
  ActiveContentReleaseSchema.pipe(
    Schema.refine(
      (release): release is ActiveRollbackContentRelease =>
        release.release.manifest.origin.kind === "rollback",
      { message: "Expected a completed rollback release." }
    )
  );

/** Historical recovery lookup used for crash-safe terminal replay. */
export const RecoveryLookupSchema = Schema.Union([
  Schema.Struct({ kind: Schema.Literal("missing") }),
  Schema.Struct({
    kind: Schema.Literal("completed"),
    value: ActiveRollbackContentReleaseSchema,
  }),
]);
export type RecoveryLookup = typeof RecoveryLookupSchema.Type;
