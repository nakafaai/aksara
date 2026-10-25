import { type ReleaseId, ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { PublicationScopeSchema } from "@nakafa/aksara-contracts/release/snapshot/scope";
import {
  type PublicationRetentionDecision,
  PublicationRetentionSchema,
} from "@nakafa/aksara-publisher/publication/spec";
import { Effect, Schema } from "effect";
import { productionArgumentsError as argumentError } from "#cli/production/error";
import {
  parseProductionOptions,
  type RawProductionOptions,
} from "#cli/production/options";
import { decodePublicationScopeSelectors } from "#cli/scope";

/** Exact immutable identity requested by one production release command. */
const ReleaseArgumentsSchema = Schema.Struct({
  command: Schema.Literal("release"),
  rebuild: Schema.optional(Schema.Literal(true)),
  releaseId: ReleaseIdSchema,
  retention: PublicationRetentionSchema,
  scope: PublicationScopeSchema,
});
export type ReleaseArguments = typeof ReleaseArgumentsSchema.Type;

/** Exact invisible release selected for explicit operator abandonment. */
const AbortArgumentsSchema = Schema.Struct({
  command: Schema.Literal("abort"),
  releaseId: ReleaseIdSchema,
});
export type AbortArguments = typeof AbortArgumentsSchema.Type;

/** Exact terminal release selected for retention-aware cleanup. */
const CleanupArgumentsSchema = Schema.Struct({
  command: Schema.Literal("cleanup"),
  releaseId: ReleaseIdSchema,
});
export type CleanupArguments = typeof CleanupArgumentsSchema.Type;

/** Current publication state requested without selecting a release. */
const StatusArgumentsSchema = Schema.Struct({
  command: Schema.Literal("status"),
});
type StatusArguments = typeof StatusArgumentsSchema.Type;

/** Exact active and retained inverse selected for healthy acceptance. */
const AcceptArgumentsSchema = Schema.Struct({
  command: Schema.Literal("accept"),
  recoveryId: ReleaseIdSchema,
  releaseId: ReleaseIdSchema,
});
export type AcceptArguments = typeof AcceptArgumentsSchema.Type;

/** Paired publication identities selected for authenticated content parity. */
const ParityArgumentsSchema = Schema.Struct({
  command: Schema.Literal("parity"),
  recoveryId: ReleaseIdSchema,
  releaseId: ReleaseIdSchema,
});
export type ParityArguments = typeof ParityArgumentsSchema.Type;

/** Exact active and retained inverse selected for emergency recovery. */
const RecoverArgumentsSchema = Schema.Struct({
  command: Schema.Literal("recover"),
  recoveryId: ReleaseIdSchema,
  releaseId: ReleaseIdSchema,
});
export type RecoverArguments = typeof RecoverArgumentsSchema.Type;

/** Complete production command vocabulary accepted at the Aksara CLI boundary. */
export type ProductionArguments =
  | AcceptArguments
  | AbortArguments
  | CleanupArguments
  | ParityArguments
  | RecoverArguments
  | ReleaseArguments
  | StatusArguments;

export type ProductionCommand = ProductionArguments["command"];
/** Narrows a raw command token to the production command vocabulary. */
export function isProductionCommand(
  value: string | undefined
): value is ProductionCommand {
  return (
    value === "parity" ||
    value === "cleanup" ||
    value === "accept" ||
    value === "abort" ||
    value === "recover" ||
    value === "release" ||
    value === "status"
  );
}

/** Decodes one release identifier while preserving its owning option. */
function decodeReleaseId(
  command: ProductionCommand,
  option: "--bootstrap-over" | "--recovery-id" | "--release-id",
  value: string
) {
  return Schema.decodeEffect(ReleaseIdSchema)(value).pipe(
    Effect.mapError(() => argumentError(command, option, "value"))
  );
}

/**
 * Decodes the one retention decision a release names: its retained inverse, or
 * the retired base that it bootstraps over. The two options exclude each other.
 */
const parseReleaseRetention = Effect.fn("AksaraCli.parseReleaseRetention")(
  function* (options: RawProductionOptions, releaseId: ReleaseId) {
    if (options.bootstrapOver === undefined) {
      if (options.recoveryId === undefined) {
        return yield* argumentError("release", "--recovery-id", "missing");
      }
      const recoveryId = yield* decodeReleaseId(
        "release",
        "--recovery-id",
        options.recoveryId
      );
      if (recoveryId === releaseId) {
        return yield* argumentError("release", "--recovery-id", "identity");
      }
      return {
        kind: "inverse",
        recoveryId,
      } satisfies PublicationRetentionDecision;
    }
    if (options.recoveryId !== undefined) {
      return yield* argumentError("release", "--bootstrap-over", "conflict");
    }
    const baseReleaseId = yield* decodeReleaseId(
      "release",
      "--bootstrap-over",
      options.bootstrapOver
    );
    if (baseReleaseId === releaseId) {
      return yield* argumentError("release", "--bootstrap-over", "identity");
    }
    return {
      baseReleaseId,
      kind: "bootstrap",
    } satisfies PublicationRetentionDecision;
  }
);

/** Decodes the exact release command, its retention decision, and its scope. */
const parseReleaseArguments = Effect.fn("AksaraCli.parseReleaseArguments")(
  function* (options: RawProductionOptions, releaseId: ReleaseId) {
    const retention = yield* parseReleaseRetention(options, releaseId);
    if (options.scope.length === 0) {
      return yield* argumentError("release", "--scope", "missing");
    }
    const scope = yield* decodePublicationScopeSelectors(options.scope).pipe(
      Effect.mapError(() => argumentError("release", "--scope", "value"))
    );
    return {
      command: "release",
      ...(options.rebuild ? { rebuild: true as const } : {}),
      releaseId,
      retention,
      scope,
    } satisfies ReleaseArguments;
  }
);

/** Decodes one already-selected production command and its strict options. */
export const parseProductionArguments = Effect.fn(
  "AksaraCli.parseProductionArguments"
)(function* (command: ProductionCommand, args: readonly string[]) {
  const options = yield* parseProductionOptions(command, args);
  if (command === "status") {
    return { command } satisfies StatusArguments;
  }
  if (options.releaseId === undefined) {
    return yield* argumentError(command, "--release-id", "missing");
  }
  const releaseId = yield* decodeReleaseId(
    command,
    "--release-id",
    options.releaseId
  );
  if (command === "abort") {
    return { command, releaseId } satisfies AbortArguments;
  }
  if (command === "cleanup") {
    return { command, releaseId } satisfies CleanupArguments;
  }
  if (command === "release") {
    return yield* parseReleaseArguments(options, releaseId);
  }
  if (options.recoveryId === undefined) {
    return yield* argumentError(command, "--recovery-id", "missing");
  }
  const recoveryId = yield* decodeReleaseId(
    command,
    "--recovery-id",
    options.recoveryId
  );
  if (recoveryId === releaseId) {
    return yield* argumentError(command, "--recovery-id", "identity");
  }
  if (command === "parity") {
    return { command, recoveryId, releaseId } satisfies ParityArguments;
  }
  if (command === "accept") {
    return { command, recoveryId, releaseId } satisfies AcceptArguments;
  }
  return { command, recoveryId, releaseId } satisfies RecoverArguments;
});
