import { type ReleaseId, ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { Effect, Schema } from "effect";

/** One exact authored document requested by the local preview command. */
export interface PreviewArguments {
  readonly document: string;
}

/** Exact immutable identity requested by one production release command. */
export interface ReleaseArguments {
  readonly command: "release";
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
  readonly releaseId: ReleaseId;
  readonly rollbackOf: ReleaseId;
}

/** Complete strict command vocabulary accepted by the Aksara CLI. */
export type CliArguments =
  | ({ readonly command: "preview" } & PreviewArguments)
  | AbortArguments
  | CleanupArguments
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
    command: Schema.Literal("abort", "cleanup", "release", "rollback"),
    option: Schema.Literal("--release-id", "--rollback-of", "command"),
    reason: Schema.Literal("duplicate", "missing", "unknown", "value"),
  }
) {}

interface RawProductionOptions {
  readonly releaseId?: string;
  readonly rollbackOf?: string;
}

/** Creates one typed argument failure without retaining unknown input values. */
function argumentError(
  command:
    | CleanupArguments["command"]
    | AbortArguments["command"]
    | ReleaseArguments["command"]
    | RollbackArguments["command"],
  option: ProductionArgumentsError["option"],
  reason: ProductionArgumentsError["reason"]
) {
  return new ProductionArgumentsError({ command, option, reason });
}

/** Decodes one release identifier while preserving its owning option. */
function decodeReleaseId(
  command:
    | AbortArguments["command"]
    | CleanupArguments["command"]
    | ReleaseArguments["command"]
    | RollbackArguments["command"],
  option: "--release-id" | "--rollback-of",
  value: string
) {
  return Schema.decodeUnknown(ReleaseIdSchema)(value).pipe(
    Effect.mapError(() => argumentError(command, option, "value"))
  );
}

/** Reads strict production options without accepting aliases or positional IDs. */
const parseProductionOptions = Effect.fn("AksaraCli.parseProductionOptions")(
  function* (
    command:
      | AbortArguments["command"]
      | CleanupArguments["command"]
      | ReleaseArguments["command"]
      | RollbackArguments["command"],
    args: readonly string[]
  ) {
    let releaseId: string | undefined;
    let rollbackOf: string | undefined;

    for (let index = 0; index < args.length; index += 1) {
      const option = args[index];
      if (option !== "--release-id" && option !== "--rollback-of") {
        return yield* argumentError(command, "command", "unknown");
      }
      if (command !== "rollback" && option === "--rollback-of") {
        return yield* argumentError(command, option, "unknown");
      }
      const existing = option === "--release-id" ? releaseId : rollbackOf;
      if (existing !== undefined) {
        return yield* argumentError(command, option, "duplicate");
      }
      const value = args[index + 1];
      if (!(value && value.trim().length > 0 && !value.startsWith("--"))) {
        return yield* argumentError(command, option, "value");
      }
      if (option === "--release-id") {
        releaseId = value;
      } else {
        rollbackOf = value;
      }
      index += 1;
    }

    return {
      ...(releaseId === undefined ? {} : { releaseId }),
      ...(rollbackOf === undefined ? {} : { rollbackOf }),
    } satisfies RawProductionOptions;
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
      command !== "abort" &&
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
    if (command === "release") {
      return { command, releaseId } satisfies ReleaseArguments;
    }
    if (options.rollbackOf === undefined) {
      return yield* argumentError(command, "--rollback-of", "missing");
    }
    const rollbackOf = yield* decodeReleaseId(
      command,
      "--rollback-of",
      options.rollbackOf
    );
    return { command, releaseId, rollbackOf } satisfies RollbackArguments;
  }
);
