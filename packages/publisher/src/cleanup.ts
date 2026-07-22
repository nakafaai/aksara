import {
  type ReleaseCleanupReceipt,
  ReleaseCleanupReceiptSchema,
  ReleaseCleanupRequestSchema,
} from "@nakafaai/aksara-contracts/release/lifecycle";
import { Effect, Schema } from "effect";
import { PublicationTarget } from "#publisher/publication/spec";

/** Cleanup input or target evidence failed its exact shared contract. */
export class ReleaseCleanupContractError extends Schema.TaggedError<ReleaseCleanupContractError>()(
  "ReleaseCleanupContractError",
  { contract: Schema.Literal("request", "receipt") }
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

/** Requires cleanup evidence to belong to the requested release identity. */
function validateReceipt(
  releaseId: (typeof ReleaseCleanupRequestSchema.Type)["releaseId"],
  receipt: ReleaseCleanupReceipt
) {
  if (receipt.releaseId === releaseId) {
    return Effect.succeed(receipt);
  }
  return Effect.fail(new ReleaseCleanupContractError({ contract: "receipt" }));
}

/** Runs one bounded cleanup page and returns its explicit resume cursor. */
export const cleanupContentRelease = Effect.fn(
  "AksaraPublisher.cleanupContentRelease"
)(function* (input: unknown) {
  const request = yield* decodeContract(
    ReleaseCleanupRequestSchema,
    "request",
    input
  );
  const target = yield* PublicationTarget;
  const response = yield* target.cleanup(request);
  const receipt = yield* decodeContract(
    ReleaseCleanupReceiptSchema,
    "receipt",
    response
  );
  return yield* validateReceipt(request.releaseId, receipt);
});
