import { Predicate, Schema } from "effect";

const ProductionStageSchema = Schema.Literal(
  "abort",
  "cleanup",
  "environment",
  "keys",
  "prepare",
  "publish",
  "renderer",
  "state",
  "target"
);
export type ProductionStage = typeof ProductionStageSchema.Type;
const SAFE_FAILURE = /^[A-Za-z][A-Za-z0-9]{0,63}$/u;

/** Sanitized production failure emitted by the outer CLI boundary. */
export class ProductionError extends Schema.TaggedError<ProductionError>()(
  "ProductionError",
  {
    failure: Schema.NonEmptyTrimmedString,
    stage: ProductionStageSchema,
  }
) {}

/** Extracts only a bounded tagged-error identity, never nested secret data. */
function failureName(error: unknown) {
  if (!Predicate.isRecord(error)) {
    return "UnknownFailure";
  }
  const tag = Reflect.get(error, "_tag");
  return typeof tag === "string" && SAFE_FAILURE.test(tag)
    ? tag
    : "UnknownFailure";
}

/** Maps one capability failure to a stable, secret-free CLI error. */
export function mapProductionError(stage: ProductionStage) {
  return (error: unknown) =>
    new ProductionError({ failure: failureName(error), stage });
}
