import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import {
  type ReleaseAbortReceipt,
  ReleaseAbortReceiptSchema,
  ReleaseAbortRequestSchema,
} from "@nakafa/aksara-contracts/release/lifecycle";
import { Effect, Schema } from "effect";
import { PublicationTarget } from "#publisher/publication/spec";

const ABORT_CALL_LIMIT = 100;
const AbortCountSchema = Schema.Number.pipe(Schema.int(), Schema.nonNegative());

/** Abort input or target evidence failed its exact shared contract. */
export class ReleaseAbortContractError extends Schema.TaggedError<ReleaseAbortContractError>()(
  "ReleaseAbortContractError",
  { contract: Schema.Literal("request", "receipt") }
) {}

/** One bounded operator invocation ended with durable abort work remaining. */
export class ReleaseAbortIncompleteError extends Schema.TaggedError<ReleaseAbortIncompleteError>()(
  "ReleaseAbortIncompleteError",
  {
    attempts: Schema.Number.pipe(Schema.int(), Schema.positive()),
    processedItems: AbortCountSchema,
    releaseId: ReleaseIdSchema,
    totalItems: AbortCountSchema,
  }
) {}

/** Strictly decodes one abort contract without retaining parser details. */
function decodeContract<A, I>(
  schema: Schema.Schema<A, I>,
  contract: "request" | "receipt",
  input: unknown
) {
  return Schema.decodeUnknown(schema)(input, {
    onExcessProperty: "error",
  }).pipe(Effect.mapError(() => new ReleaseAbortContractError({ contract })));
}

/** Requires one cumulative receipt to preserve identity, total, and progress. */
function validateReceipt(
  releaseId: typeof ReleaseIdSchema.Type,
  previous: ReleaseAbortReceipt | undefined,
  receipt: ReleaseAbortReceipt
) {
  if (
    receipt.releaseId === releaseId &&
    (previous === undefined ||
      (receipt.processedItems >= previous.processedItems &&
        receipt.totalItems === previous.totalItems))
  ) {
    return Effect.void;
  }
  return Effect.fail(new ReleaseAbortContractError({ contract: "receipt" }));
}

/** Advances server-owned abort state until complete or the call budget ends. */
export const abortContentRelease = Effect.fn(
  "AksaraPublisher.abortContentRelease"
)(function* (input: unknown) {
  const request = yield* decodeContract(
    ReleaseAbortRequestSchema,
    "request",
    input
  );
  const target = yield* PublicationTarget;
  let progress = { processedItems: 0, totalItems: 0 };
  let previous: ReleaseAbortReceipt | undefined;
  for (let attempts = 1; attempts <= ABORT_CALL_LIMIT; attempts += 1) {
    const response = yield* target.abort(request);
    const receipt = yield* decodeContract(
      ReleaseAbortReceiptSchema,
      "receipt",
      response
    );
    yield* validateReceipt(request.releaseId, previous, receipt);
    if (receipt.complete) {
      return receipt;
    }
    previous = receipt;
    progress = receipt;
  }
  const { processedItems, totalItems } = progress;
  return yield* new ReleaseAbortIncompleteError({
    attempts: ABORT_CALL_LIMIT,
    processedItems,
    releaseId: request.releaseId,
    totalItems,
  });
});
