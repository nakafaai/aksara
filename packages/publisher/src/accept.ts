import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import {
  type ReleaseAbortReceipt,
  ReleaseAbortReceiptSchema,
  ReleaseAcceptRequestSchema,
} from "@nakafa/aksara-contracts/release/lifecycle";
import { Effect, Schema } from "effect";
import { PublicationTarget } from "#publisher/publication/spec";
import type { PublicationTargetFailure } from "#publisher/target/errors";

const ACCEPT_CALL_LIMIT = 100;
const AcceptCountSchema = Schema.Number.pipe(
  Schema.int(),
  Schema.nonNegative()
);

/** Acceptance input or cumulative target evidence violated its exact contract. */
export class ReleaseAcceptContractError extends Schema.TaggedError<ReleaseAcceptContractError>()(
  "ReleaseAcceptContractError",
  { contract: Schema.Literal("request", "receipt") }
) {}

/** One bounded acceptance invocation ended with retained rows still present. */
export class ReleaseAcceptIncompleteError extends Schema.TaggedError<ReleaseAcceptIncompleteError>()(
  "ReleaseAcceptIncompleteError",
  {
    attempts: Schema.Number.pipe(Schema.int(), Schema.positive()),
    processedItems: AcceptCountSchema,
    releaseId: ReleaseIdSchema,
    totalItems: AcceptCountSchema,
  }
) {}

type AcceptContentRelease = (
  input: unknown
) => Effect.Effect<
  ReleaseAbortReceipt,
  | PublicationTargetFailure
  | ReleaseAcceptContractError
  | ReleaseAcceptIncompleteError,
  PublicationTarget
>;

/** Strictly decodes one acceptance contract without retaining parser details. */
function decodeContract<A, I>(
  schema: Schema.Schema<A, I>,
  contract: "request" | "receipt",
  input: unknown
) {
  return Schema.decodeUnknown(schema)(input, {
    onExcessProperty: "error",
  }).pipe(Effect.mapError(() => new ReleaseAcceptContractError({ contract })));
}

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

/** Resumably discards a retained inverse after accepting its healthy release. */
export const acceptContentRelease: AcceptContentRelease = Effect.fn(
  "AksaraPublisher.acceptContentRelease"
)(function* (input: unknown) {
  const request = yield* decodeContract(
    ReleaseAcceptRequestSchema,
    "request",
    input
  );
  const target = yield* PublicationTarget;
  let progress = { processedItems: 0, totalItems: 0 };
  let previous: ReleaseAbortReceipt | undefined;
  for (let attempts = 1; attempts <= ACCEPT_CALL_LIMIT; attempts += 1) {
    const response = yield* target.accept(request);
    const receipt = yield* decodeContract(
      ReleaseAbortReceiptSchema,
      "receipt",
      response
    );
    yield* validateReceipt(request.recoveryId, previous, receipt);
    if (receipt.complete) {
      return receipt;
    }
    previous = receipt;
    progress = receipt;
  }
  return yield* new ReleaseAcceptIncompleteError({
    attempts: ACCEPT_CALL_LIMIT,
    processedItems: progress.processedItems,
    releaseId: request.recoveryId,
    totalItems: progress.totalItems,
  });
});
