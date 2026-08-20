import { type ReleaseId, ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import type { PublicationScope } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { Effect, Schema } from "effect";
import { decodePublicationScopeSelectors } from "#cli/scope";

/** Exact immutable identity requested by one production release command. */
export interface ReleaseArguments {
  readonly command: "release";
  readonly recoveryId: ReleaseId;
  readonly releaseId: ReleaseId;
  readonly scope: PublicationScope;
}

/** Exact invisible release selected for explicit operator abandonment. */
export interface AbortArguments {
  readonly command: "abort";
  readonly releaseId: ReleaseId;
}

/** Exact terminal release selected for retention-aware cleanup. */
export interface CleanupArguments {
  readonly command: "cleanup";
  readonly releaseId: ReleaseId;
}

/** Current publication state requested without selecting a release. */
export interface StatusArguments {
  readonly command: "status";
}

/** New release identity and exact historical release selected for rollback. */
export interface RollbackArguments {
  readonly command: "rollback";
  readonly recoveryId: ReleaseId;
  readonly releaseId: ReleaseId;
  readonly rollbackOf: ReleaseId;
}

/** Exact active and retained inverse selected for healthy acceptance. */
export interface AcceptArguments {
  readonly command: "accept";
  readonly recoveryId: ReleaseId;
  readonly releaseId: ReleaseId;
}

/** Exact active and retained inverse selected for emergency recovery. */
export interface RecoverArguments {
  readonly command: "recover";
  readonly recoveryId: ReleaseId;
  readonly releaseId: ReleaseId;
}

/** Complete production command vocabulary accepted at the Aksara CLI boundary. */
export type ProductionArguments =
  | AcceptArguments
  | AbortArguments
  | CleanupArguments
  | RecoverArguments
  | ReleaseArguments
  | RollbackArguments
  | StatusArguments;

/** Production arguments do not describe one unambiguous release operation. */
export class ProductionArgumentsError extends Schema.TaggedError<ProductionArgumentsError>()(
  "ProductionArgumentsError",
  {
    command: Schema.Literals([
      "abort",
      "accept",
      "cleanup",
      "recover",
      "release",
      "rollback",
      "status",
    ]),
    option: Schema.Literals([
      "--recovery-id",
      "--release-id",
      "--rollback-of",
      "--scope",
      "command",
    ]),
    reason: Schema.Literals([
      "duplicate",
      "identity",
      "missing",
      "unknown",
      "value",
    ]),
  }
) {}

interface RawProductionOptions {
  recoveryId?: string;
  releaseId?: string;
  rollbackOf?: string;
  scope: string[];
}

export type ProductionCommand = ProductionArguments["command"];
type ProductionOption =
  | "--recovery-id"
  | "--release-id"
  | "--rollback-of"
  | "--scope";
type UniqueProductionOption = Exclude<ProductionOption, "--scope">;

const OPTION_KEYS = {
  "--recovery-id": "recoveryId",
  "--release-id": "releaseId",
  "--rollback-of": "rollbackOf",
} as const satisfies Record<UniqueProductionOption, keyof RawProductionOptions>;

/** Narrows a raw command token to the production command vocabulary. */
export function isProductionCommand(
  value: string | undefined
): value is ProductionCommand {
  return (
    value === "cleanup" ||
    value === "accept" ||
    value === "abort" ||
    value === "recover" ||
    value === "release" ||
    value === "rollback" ||
    value === "status"
  );
}

/** Narrows unknown command input to one supported named option. */
function isProductionOption(
  value: string | undefined
): value is ProductionOption {
  return (
    value === "--recovery-id" ||
    value === "--release-id" ||
    value === "--rollback-of" ||
    value === "--scope"
  );
}

/** Checks whether one command owns the selected production option. */
function acceptsOption(command: ProductionCommand, option: ProductionOption) {
  if (command === "status") {
    return false;
  }
  if (option === "--scope") {
    return command === "release";
  }
  if (option === "--rollback-of") {
    return command === "rollback";
  }
  if (option === "--recovery-id") {
    return command !== "abort" && command !== "cleanup";
  }
  return true;
}

/** Creates one typed argument failure without retaining unknown input values. */
function argumentError(
  command: ProductionCommand,
  option: ProductionArgumentsError["option"],
  reason: ProductionArgumentsError["reason"]
) {
  return new ProductionArgumentsError({ command, option, reason });
}

/** Decodes one release identifier while preserving its owning option. */
function decodeReleaseId(
  command: ProductionCommand,
  option: UniqueProductionOption,
  value: string
) {
  return Schema.decodeEffect(ReleaseIdSchema)(value).pipe(
    Effect.mapError(() => argumentError(command, option, "value"))
  );
}

/** Reads strict production options without aliases or positional IDs. */
const parseProductionOptions = Effect.fn("AksaraCli.parseProductionOptions")(
  function* (command: ProductionCommand, args: readonly string[]) {
    const options: RawProductionOptions = { scope: [] };

    for (let index = 0; index < args.length; index += 1) {
      const option = args[index];
      if (!isProductionOption(option)) {
        return yield* argumentError(command, "command", "unknown");
      }
      if (!acceptsOption(command, option)) {
        return yield* argumentError(command, option, "unknown");
      }
      const value = args[index + 1];
      if (!(value && value.trim().length > 0 && !value.startsWith("--"))) {
        return yield* argumentError(command, option, "value");
      }
      if (option === "--scope") {
        options.scope.push(value);
        index += 1;
        continue;
      }
      const key = OPTION_KEYS[option];
      if (options[key] !== undefined) {
        return yield* argumentError(command, option, "duplicate");
      }
      options[key] = value;
      index += 1;
    }

    return options;
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
  if (command === "accept") {
    return { command, recoveryId, releaseId } satisfies AcceptArguments;
  }
  if (command === "recover") {
    return { command, recoveryId, releaseId } satisfies RecoverArguments;
  }
  if (command === "release") {
    if (options.scope.length === 0) {
      return yield* argumentError(command, "--scope", "missing");
    }
    const scope = yield* decodePublicationScopeSelectors(options.scope).pipe(
      Effect.mapError(() => argumentError(command, "--scope", "value"))
    );
    return {
      command,
      recoveryId,
      releaseId,
      scope,
    } satisfies ReleaseArguments;
  }
  if (options.rollbackOf === undefined) {
    return yield* argumentError(command, "--rollback-of", "missing");
  }
  const rollbackOf = yield* decodeReleaseId(
    command,
    "--rollback-of",
    options.rollbackOf
  );
  if (releaseId === rollbackOf) {
    return yield* argumentError(command, "--rollback-of", "identity");
  }
  if (recoveryId === rollbackOf) {
    return yield* argumentError(command, "--recovery-id", "identity");
  }
  return {
    command,
    recoveryId,
    releaseId,
    rollbackOf,
  } satisfies RollbackArguments;
});
