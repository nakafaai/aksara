import { Predicate, Schema } from "effect";

const ProductionStageSchema = Schema.Literal(
  "abort",
  "accept",
  "cleanup",
  "environment",
  "keys",
  "prepare",
  "publish",
  "renderer",
  "recover",
  "state",
  "target"
);
export type ProductionStage = typeof ProductionStageSchema.Type;
const ActivationPhaseSchema = Schema.Literal("cache", "preflight");
const SAFE_FAILURE = /^[A-Za-z][A-Za-z0-9]{0,63}$/u;

/** Sanitized production failure emitted by the outer CLI boundary. */
export class ProductionError extends Schema.TaggedError<ProductionError>()(
  "ProductionError",
  {
    failure: Schema.NonEmptyTrimmedString,
    phase: Schema.optional(ActivationPhaseSchema),
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

/** Preserves only the safe activation phase needed for operator recovery. */
function activationPhase(error: unknown) {
  if (
    !Predicate.isRecord(error) ||
    Reflect.get(error, "_tag") !== "PublicationActivationError"
  ) {
    return;
  }
  const phase = Reflect.get(error, "phase");
  return phase === "cache" || phase === "preflight" ? phase : undefined;
}

/** Maps one capability failure to a stable, secret-free CLI error. */
export function mapProductionError(stage: ProductionStage) {
  return (error: unknown) => {
    const phase = activationPhase(error);
    return new ProductionError({
      failure: failureName(error),
      ...(phase === undefined ? {} : { phase }),
      stage,
    });
  };
}
