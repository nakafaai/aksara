import { Effect, Schema } from "effect";
import { ContractDecodeError } from "#contracts/errors";

/** Strictly decodes one named wire contract into the shared typed failure. */
export function decodeContract<A, I>(
  schema: Schema.Schema<A, I>,
  contract: string,
  input: unknown
) {
  return Schema.decodeUnknown(schema)(input, {
    onExcessProperty: "error",
  }).pipe(
    Effect.mapError(
      (cause) =>
        new ContractDecodeError({ cause, contract, message: String(cause) })
    )
  );
}
