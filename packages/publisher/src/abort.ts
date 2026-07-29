import type { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import {
  type ReleaseAbortReceipt,
  ReleaseAbortReceiptSchema,
  ReleaseAbortRequestSchema,
} from "@nakafa/aksara-contracts/release/lifecycle";
import { Effect, Schema } from "effect";
import { decodeContract } from "#publisher/contract/decode";
import { PublicationTarget } from "#publisher/publication/spec";

/** Abort input or target evidence failed its exact shared contract. */
export class ReleaseAbortContractError extends Schema.TaggedError<ReleaseAbortContractError>()(
  "ReleaseAbortContractError",
  { contract: Schema.Literal("request", "receipt") }
) {}

/** Requires one cumulative receipt to preserve identity, total, and progress. */
function validateReceipt(
  releaseId: typeof ReleaseIdSchema.Type,
  previous: ReleaseAbortReceipt | undefined,
  receipt: ReleaseAbortReceipt
) {
  const processedBefore = previous?.processedItems ?? 0;
  if (
    receipt.releaseId === releaseId &&
    (previous === undefined || receipt.totalItems === previous.totalItems) &&
    (receipt.complete || receipt.processedItems > processedBefore)
  ) {
    return Effect.void;
  }
  return Effect.fail(new ReleaseAbortContractError({ contract: "receipt" }));
}

/**
 * Advances every server-owned abort page until completion is proven.
 *
 * The stable total and strict integer progress bound calls to the target.
 */
export const abortContentRelease = Effect.fn(
  "AksaraPublisher.abortContentRelease"
)(function* (input: unknown) {
  const request = yield* decodeContract(
    ReleaseAbortRequestSchema,
    input,
    new ReleaseAbortContractError({ contract: "request" })
  );
  const target = yield* PublicationTarget;
  let previous: ReleaseAbortReceipt | undefined;
  let receipt: ReleaseAbortReceipt;
  do {
    const response = yield* target.abort(request);
    receipt = yield* decodeContract(
      ReleaseAbortReceiptSchema,
      response,
      new ReleaseAbortContractError({ contract: "receipt" })
    );
    yield* validateReceipt(request.releaseId, previous, receipt);
    previous = receipt;
  } while (!receipt.complete);
  return receipt;
});
