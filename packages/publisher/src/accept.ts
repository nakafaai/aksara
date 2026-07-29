import type { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import {
  type ReleaseAbortReceipt,
  ReleaseAbortReceiptSchema,
  ReleaseAcceptRequestSchema,
} from "@nakafa/aksara-contracts/release/lifecycle";
import { Effect, Schema } from "effect";
import { decodeContract } from "#publisher/contract/decode";
import { PublicationTarget } from "#publisher/publication/spec";
import type { PublicationTargetFailure } from "#publisher/target/errors";

/** Acceptance input or cumulative target evidence violated its exact contract. */
export class ReleaseAcceptContractError extends Schema.TaggedError<ReleaseAcceptContractError>()(
  "ReleaseAcceptContractError",
  { contract: Schema.Literal("request", "receipt") }
) {}

type AcceptContentRelease = (
  input: unknown
) => Effect.Effect<
  ReleaseAbortReceipt,
  PublicationTargetFailure | ReleaseAcceptContractError,
  PublicationTarget
>;

/** Requires stable recovery identity, total size, and forward page progress. */
function validateReceipt(
  recoveryId: typeof ReleaseIdSchema.Type,
  previous: ReleaseAbortReceipt | undefined,
  receipt: ReleaseAbortReceipt
) {
  const processedBefore = previous?.processedItems ?? 0;
  if (
    receipt.releaseId === recoveryId &&
    (previous === undefined || receipt.totalItems === previous.totalItems) &&
    (receipt.complete || receipt.processedItems > processedBefore)
  ) {
    return Effect.void;
  }
  return Effect.fail(new ReleaseAcceptContractError({ contract: "receipt" }));
}

/**
 * Discards every retained inverse row after accepting its healthy release.
 *
 * The stable total and strict integer progress bound calls to the target.
 */
export const acceptContentRelease: AcceptContentRelease = Effect.fn(
  "AksaraPublisher.acceptContentRelease"
)(function* (input: unknown) {
  const request = yield* decodeContract(
    ReleaseAcceptRequestSchema,
    input,
    new ReleaseAcceptContractError({ contract: "request" })
  );
  const target = yield* PublicationTarget;
  let previous: ReleaseAbortReceipt | undefined;
  let receipt: ReleaseAbortReceipt;
  do {
    const response = yield* target.accept(request);
    receipt = yield* decodeContract(
      ReleaseAbortReceiptSchema,
      response,
      new ReleaseAcceptContractError({ contract: "receipt" })
    );
    yield* validateReceipt(request.recoveryId, previous, receipt);
    previous = receipt;
  } while (!receipt.complete);
  return receipt;
});
