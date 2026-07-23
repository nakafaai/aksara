import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import {
  type ReleaseCleanupReceipt,
  ReleaseCleanupReceiptSchema,
  ReleaseCleanupRequestSchema,
} from "@nakafa/aksara-contracts/release/lifecycle";
import { Effect, Schema } from "effect";
import { PublicationTarget } from "#publisher/publication/spec";

const CLEANUP_CALL_LIMIT = 100;
const CleanupCountSchema = Schema.Number.pipe(
  Schema.int(),
  Schema.nonNegative()
);

/** Cleanup input or target evidence failed its exact shared contract. */
export class ReleaseCleanupContractError extends Schema.TaggedError<ReleaseCleanupContractError>()(
  "ReleaseCleanupContractError",
  { contract: Schema.Literal("request", "receipt") }
) {}

/** Durable retention prevents cleanup from advancing before this timestamp. */
export class ReleaseCleanupDeferredError extends Schema.TaggedError<ReleaseCleanupDeferredError>()(
  "ReleaseCleanupDeferredError",
  {
    releaseId: ReleaseIdSchema,
    retryAt: Schema.Number.pipe(
      Schema.int(),
      Schema.nonNegative(),
      Schema.finite()
    ),
  }
) {}

/** Cleanup remains resumable after one bounded CLI invocation exhausts its calls. */
export class ReleaseCleanupIncompleteError extends Schema.TaggedError<ReleaseCleanupIncompleteError>()(
  "ReleaseCleanupIncompleteError",
  {
    attempts: Schema.Number.pipe(Schema.int(), Schema.positive()),
    deletedArtifacts: CleanupCountSchema,
    releaseId: ReleaseIdSchema,
  }
) {}

/** Strictly decodes one cleanup contract without throwing parse errors. */
function decodeContract<A, I>(
  schema: Schema.Schema<A, I>,
  contract: "request" | "receipt",
  input: unknown
) {
  return Schema.decodeUnknown(schema)(input, {
    onExcessProperty: "error",
  }).pipe(Effect.mapError(() => new ReleaseCleanupContractError({ contract })));
}

/** Requires one cumulative receipt to preserve identity and monotonic totals. */
function validateReceipt(
  request: typeof ReleaseCleanupRequestSchema.Type,
  previous: ReleaseCleanupReceipt | undefined,
  receipt: ReleaseCleanupReceipt
) {
  if (
    receipt.releaseId === request.releaseId &&
    (previous === undefined ||
      receipt.deletedArtifacts >= previous.deletedArtifacts)
  ) {
    return Effect.succeed(receipt);
  }
  return Effect.fail(new ReleaseCleanupContractError({ contract: "receipt" }));
}

/** Advances server-owned cleanup until it completes or retention defers it. */
export const cleanupContentRelease = Effect.fn(
  "AksaraPublisher.cleanupContentRelease"
)(function* (input: unknown) {
  const request = yield* decodeContract(
    ReleaseCleanupRequestSchema,
    "request",
    input
  );
  const target = yield* PublicationTarget;
  let progress = { deletedArtifacts: 0 };
  let previous: ReleaseCleanupReceipt | undefined;
  for (let attempts = 1; attempts <= CLEANUP_CALL_LIMIT; attempts += 1) {
    const response = yield* target.cleanup(request);
    const receipt = yield* decodeContract(
      ReleaseCleanupReceiptSchema,
      "receipt",
      response
    );
    yield* validateReceipt(request, previous, receipt);
    if (receipt.complete) {
      return receipt;
    }
    if (receipt.retryAt !== undefined) {
      return yield* new ReleaseCleanupDeferredError({
        releaseId: receipt.releaseId,
        retryAt: receipt.retryAt,
      });
    }
    previous = receipt;
    progress = receipt;
  }
  const { deletedArtifacts } = progress;
  return yield* new ReleaseCleanupIncompleteError({
    attempts: CLEANUP_CALL_LIMIT,
    deletedArtifacts,
    releaseId: request.releaseId,
  });
});
