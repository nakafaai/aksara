import {
  PublicationRejectedSchema,
  PublicationRejectionCodeSchema,
} from "@nakafa/aksara-contracts/transport/failure";
import { PublicationOperationSchema } from "@nakafa/aksara-contracts/transport/request";
import {
  PublicationTargetTransportError,
  PublicationTransportDetailSchema,
} from "@nakafa/aksara-publisher/target/errors";
import { Option, Predicate, Schema } from "effect";
import { NakafaAppError } from "#cli/app-error";
import { ProductionEnvironmentError } from "#cli/environment/error";

const ProductionStageSchema = Schema.Literals([
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
  "target",
]);
export type ProductionStage = typeof ProductionStageSchema.Type;
const ActivationPhaseSchema = Schema.Literals(["cache", "preflight"]);
const SAFE_FAILURE = /^[A-Za-z][A-Za-z0-9]{0,63}$/u;

/** Sanitized production failure emitted by the outer CLI boundary. */
export class ProductionError extends Schema.TaggedError<ProductionError>()(
  "ProductionError",
  {
    appReason: Schema.optional(NakafaAppError.fields.reason),
    appStatus: NakafaAppError.fields.status,
    environmentVariable: Schema.optional(
      ProductionEnvironmentError.fields.variable
    ),
    failure: Schema.Trimmed.check(Schema.isNonEmpty()),
    phase: Schema.optional(ActivationPhaseSchema),
    rejectionCode: Schema.optional(PublicationRejectionCodeSchema),
    stage: ProductionStageSchema,
    targetOperation: Schema.optional(PublicationOperationSchema),
    targetStage: Schema.optional(PublicationTargetTransportError.fields.stage),
    transport: Schema.optional(PublicationTransportDetailSchema),
  }
) {}

/** Preserves the safe reason and status owned by the Nakafa app boundary. */
function appEvidence(error: unknown) {
  if (!(error instanceof NakafaAppError)) {
    return {};
  }
  return {
    appReason: error.reason,
    ...(error.status === undefined ? {} : { appStatus: error.status }),
  };
}

/** Preserves the safe variable name owned by the production environment. */
function environmentEvidence(error: unknown) {
  if (!(error instanceof ProductionEnvironmentError)) {
    return {};
  }
  return { environmentVariable: error.variable };
}

/** Extracts only a bounded tagged-error identity, never nested secret data. */
function failureName(error: unknown) {
  if (!Predicate.isObject(error)) {
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
    !Predicate.isObject(error) ||
    Reflect.get(error, "_tag") !== "PublicationActivationError"
  ) {
    return;
  }
  const phase = Reflect.get(error, "phase");
  return phase === "cache" || phase === "preflight" ? phase : undefined;
}

/** Preserves only stable target evidence already authenticated by the wire. */
function targetEvidence(error: unknown) {
  if (error instanceof PublicationTargetTransportError) {
    return { targetStage: error.stage, transport: error.detail };
  }
  if (
    !Predicate.isObject(error) ||
    Reflect.get(error, "_tag") !== "PublicationTargetRejectedError"
  ) {
    return {};
  }
  const rejection = Schema.decodeUnknownOption(PublicationRejectedSchema)(
    Reflect.get(error, "rejection")
  );
  if (Option.isNone(rejection)) {
    return {};
  }
  if (rejection.value.operation === null) {
    return { rejectionCode: rejection.value.code };
  }
  return {
    rejectionCode: rejection.value.code,
    targetOperation: rejection.value.operation,
  };
}

/** Maps one capability failure to a stable, secret-free CLI error. */
export function mapProductionError(stage: ProductionStage) {
  return (error: unknown) => {
    const phase = activationPhase(error);
    return new ProductionError({
      ...appEvidence(error),
      ...environmentEvidence(error),
      failure: failureName(error),
      ...(phase === undefined ? {} : { phase }),
      stage,
      ...targetEvidence(error),
    });
  };
}
