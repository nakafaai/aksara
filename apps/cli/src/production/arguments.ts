import { type ReleaseId, ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import type { PublicationScope } from "@nakafa/aksara-contracts/release/snapshot/scope";
import { Effect, Schema } from "effect";
import { productionArgumentsError as argumentError } from "#cli/production/error";
import { parseProductionOptions } from "#cli/production/options";
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

/** Exclusive destination for the one reviewed signed genesis runtime bundle. */
export interface GenesisArguments {
  readonly bundlePath: string;
  readonly command: "genesis";
}
/** Complete production command vocabulary accepted at the Aksara CLI boundary. */
export type ProductionArguments =
  | AcceptArguments
  | AbortArguments
  | CleanupArguments
  | GenesisArguments
  | RecoverArguments
  | ReleaseArguments
  | StatusArguments;

export type ProductionCommand = ProductionArguments["command"];
/** Narrows a raw command token to the production command vocabulary. */
export function isProductionCommand(
  value: string | undefined
): value is ProductionCommand {
  return (
    value === "cleanup" ||
    value === "genesis" ||
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
  if (command === "genesis") {
    if (options.bundlePath === undefined) {
      return yield* argumentError(command, "--bundle-path", "missing");
    }
    if (!options.bundlePath.startsWith("/")) {
      return yield* argumentError(command, "--bundle-path", "value");
    }
    return {
      bundlePath: options.bundlePath,
      command,
    } satisfies GenesisArguments;
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
});
