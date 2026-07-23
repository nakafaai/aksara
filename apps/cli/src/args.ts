import { type ReleaseId, ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { Effect, Schema } from "effect";

/** One exact authored document requested by the local preview command. */
export interface PreviewArguments {
  readonly document: string;
}

/** Exact immutable identity requested by one production release command. */
export interface ReleaseArguments {
  readonly command: "release";
  readonly recoveryId: ReleaseId;
  readonly releaseId: ReleaseId;
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

/** Complete strict command vocabulary accepted by the Aksara CLI. */
export type CliArguments =
  | ({ readonly command: "preview" } & PreviewArguments)
  | AcceptArguments
  | AbortArguments
  | CleanupArguments
  | RecoverArguments
  | ReleaseArguments
  | RollbackArguments;

/** Command-line arguments do not describe one unambiguous document. */
export class PreviewArgumentsError extends Schema.TaggedError<PreviewArgumentsError>()(
  "PreviewArgumentsError",
  {
    reason: Schema.Literal("duplicate", "missing", "unknown", "value"),
  }
) {}

/** Production arguments do not describe one unambiguous release operation. */
export class ProductionArgumentsError extends Schema.TaggedError<ProductionArgumentsError>()(
  "ProductionArgumentsError",
  {
    command: Schema.Literal(
      "abort",
      "accept",
      "cleanup",
      "recover",
      "release",
      "rollback"
    ),
    option: Schema.Literal(
      "--recovery-id",
      "--release-id",
      "--rollback-of",
      "command"
    ),
    reason: Schema.Literal(
      "duplicate",
      "identity",
      "missing",
      "unknown",
      "value"
    ),
  }
) {}

interface RawProductionOptions {
  recoveryId?: string;
  releaseId?: string;
  rollbackOf?: string;
}

type ProductionCommand =
  | AbortArguments["command"]
  | AcceptArguments["command"]
  | CleanupArguments["command"]
  | RecoverArguments["command"]
  | ReleaseArguments["command"]
  | RollbackArguments["command"];
type ProductionOption = "--recovery-id" | "--release-id" | "--rollback-of";

const OPTION_KEYS = {
  "--recovery-id": "recoveryId",
  "--release-id": "releaseId",
  "--rollback-of": "rollbackOf",
} as const satisfies Record<ProductionOption, keyof RawProductionOptions>;

/** Narrows unknown command input to one supported named option. */
function isProductionOption(
  value: string | undefined
): value is ProductionOption {
  return (
    value === "--recovery-id" ||
    value === "--release-id" ||
    value === "--rollback-of"
  );
}

/** Checks whether one command owns the selected production option. */
function acceptsOption(command: ProductionCommand, option: ProductionOption) {
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
  option: ProductionOption,
  value: string
) {
  return Schema.decodeUnknown(ReleaseIdSchema)(value).pipe(
    Effect.mapError(() => argumentError(command, option, "value"))
  );
}

/** Reads strict production options without accepting aliases or positional IDs. */
const parseProductionOptions = Effect.fn("AksaraCli.parseProductionOptions")(
  function* (command: ProductionCommand, args: readonly string[]) {
    const options: RawProductionOptions = {};

    for (let index = 0; index < args.length; index += 1) {
      const option = args[index];
      if (!isProductionOption(option)) {
        return yield* argumentError(command, "command", "unknown");
      }
      if (!acceptsOption(command, option)) {
        return yield* argumentError(command, option, "unknown");
      }
      const key = OPTION_KEYS[option];
      if (options[key] !== undefined) {
        return yield* argumentError(command, option, "duplicate");
      }
      const value = args[index + 1];
      if (!(value && value.trim().length > 0 && !value.startsWith("--"))) {
        return yield* argumentError(command, option, "value");
      }
      options[key] = value;
      index += 1;
    }

    return options;
  }
);

/** Decodes only `--document <path>` and rejects every ambiguous argument. */
export const parsePreviewArguments = Effect.fn("AksaraCli.parseArguments")(
  (args: readonly string[]) => {
    let document: string | undefined;
    for (let index = 0; index < args.length; index += 1) {
      const argument = args[index];
      if (argument !== "--document") {
        return Effect.fail(new PreviewArgumentsError({ reason: "unknown" }));
      }
      if (document !== undefined) {
        return Effect.fail(new PreviewArgumentsError({ reason: "duplicate" }));
      }
      const value = args[index + 1];
      if (!(value && value.trim().length > 0 && value !== "--document")) {
        return Effect.fail(new PreviewArgumentsError({ reason: "value" }));
      }
      document = value;
      index += 1;
    }
    if (document === undefined) {
      return Effect.fail(new PreviewArgumentsError({ reason: "missing" }));
    }
    return Effect.succeed({ document } satisfies PreviewArguments);
  }
);

/** Dispatches implicit preview and explicit production command arguments. */
export const parseCliArguments = Effect.fn("AksaraCli.parseCliArguments")(
  function* (args: readonly string[]) {
    const [command] = args;
    if (
      command !== "cleanup" &&
      command !== "accept" &&
      command !== "abort" &&
      command !== "recover" &&
      command !== "release" &&
      command !== "rollback"
    ) {
      const preview = yield* parsePreviewArguments(args);
      return { command: "preview", ...preview } satisfies CliArguments;
    }

    const options = yield* parseProductionOptions(command, args.slice(1));
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
      return { command, recoveryId, releaseId } satisfies ReleaseArguments;
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
  }
);
