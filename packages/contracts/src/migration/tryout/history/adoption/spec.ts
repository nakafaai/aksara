import { Schema } from "effect";
import { HistoricalSignedContentReleaseSchema } from "#contracts/history/release";
import { HistoricalRendererManifestSchema } from "#contracts/history/renderer";
import { ReleaseIdSchema, Sha256HashSchema } from "#contracts/ids";
import { TryoutSnapshotSchema } from "#contracts/tryout/snapshot/spec";

const NonNegativeCountSchema = Schema.Int.pipe(
  Schema.check(Schema.isGreaterThanOrEqualTo(0))
);
const PositiveCountSchema = Schema.Int.pipe(
  Schema.check(Schema.isGreaterThan(0))
);
const OutcomeCountSchema = Schema.Literals([0, 1]);

/** Public-safe exact source for one terminal-attempt runtime adoption. */
export const TryoutRuntimeAdoptionSourceSchema = Schema.Struct({
  attemptCount: PositiveCountSchema,
  inventoryHash: Sha256HashSchema,
  release: HistoricalSignedContentReleaseSchema,
  rendererManifest: HistoricalRendererManifestSchema,
  snapshot: TryoutSnapshotSchema,
});
export type TryoutRuntimeAdoptionSource =
  typeof TryoutRuntimeAdoptionSourceSchema.Type;

/** Exact idempotent result of adopting one historical runtime pair. */
export const TryoutRuntimeAdoptionReceiptSchema = Schema.Struct({
  adopted: NonNegativeCountSchema,
  alreadyAdopted: NonNegativeCountSchema,
  attemptCount: PositiveCountSchema,
  bundleCreated: OutcomeCountSchema,
  bundleHash: Sha256HashSchema,
  bundleUnchanged: OutcomeCountSchema,
  snapshotId: Sha256HashSchema,
  sourceReleaseId: ReleaseIdSchema,
}).pipe(
  Schema.check(
    Schema.makeFilter(
      ({ adopted, alreadyAdopted, attemptCount }) =>
        adopted + alreadyAdopted === attemptCount,
      {
        message:
          "Expected every historical attempt to be adopted exactly once.",
      }
    )
  ),
  Schema.check(
    Schema.makeFilter(
      ({ bundleCreated, bundleUnchanged }) =>
        bundleCreated + bundleUnchanged === 1,
      { message: "Expected exactly one created or unchanged runtime bundle." }
    )
  )
);
export type TryoutRuntimeAdoptionReceipt =
  typeof TryoutRuntimeAdoptionReceiptSchema.Type;

/** One retained runtime source contradicts its authenticated immutable bytes. */
export class TryoutRuntimeAdoptionSourceError extends Schema.TaggedError<TryoutRuntimeAdoptionSourceError>()(
  "TryoutRuntimeAdoptionSourceError",
  {
    reason: Schema.Literals(["release", "renderer", "snapshot"]),
  }
) {}
