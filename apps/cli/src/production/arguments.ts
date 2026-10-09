import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { PublicationScopeSchema } from "@nakafa/aksara-contracts/release/snapshot/scope";
import { Effect, Schema } from "effect";
import { productionArgumentsError as argumentError } from "#cli/production/error";
import { parseProductionOptions } from "#cli/production/options";
import { decodePublicationScopeSelectors } from "#cli/scope";

/** Exact immutable identity requested by one production release command. */
const ReleaseArgumentsSchema = Schema.Struct({
  command: Schema.Literal("release"),
  rebuild: Schema.optional(Schema.Literal(true)),
  recoveryId: ReleaseIdSchema,
  releaseId: ReleaseIdSchema,
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
  option: "--recovery-id" | "--release-id",
  value: string
) {
  return Schema.decodeEffect(ReleaseIdSchema)(value).pipe(
    Effect.mapError(() => argumentError(command, option, "value"))
  );
}

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
  if (command === "recover") {
    return { command, recoveryId, releaseId } satisfies RecoverArguments;
  }
  if (options.scope.length === 0) {
    return yield* argumentError(command, "--scope", "missing");
  }
  const scope = yield* decodePublicationScopeSelectors(options.scope).pipe(
    Effect.mapError(() => argumentError(command, "--scope", "value"))
  );
  return {
    command,
    ...(options.rebuild ? { rebuild: true as const } : {}),
    recoveryId,
    releaseId,
    scope,
  } satisfies ReleaseArguments;
});
