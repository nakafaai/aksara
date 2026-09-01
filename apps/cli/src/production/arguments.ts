import {
  type ReleaseId,
  ReleaseIdSchema,
  type Sha256Hash,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import type { PublicationScope } from "@nakafa/aksara-contracts/release/snapshot/scope";
import { Effect, Schema } from "effect";
import { productionArgumentsError as argumentError } from "#cli/production/error";
import { parseProductionOptions } from "#cli/production/options";
import { decodePublicationScopeSelectors } from "#cli/scope";

/** Exact immutable identity requested by one production release command. */
export interface ReleaseArguments {
  readonly command: "release";
  readonly rebuild?: true | undefined;
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

/** Exact active and retained inverse selected for a Question body audit. */
export interface AuditArguments {
  readonly command: "audit";
  readonly manifestHash: Sha256Hash;
  readonly recoveryId: ReleaseId;
  readonly recoveryManifestHash: Sha256Hash;
  readonly releaseId: ReleaseId;
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
  | AuditArguments
  | CleanupArguments
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
    value === "accept" ||
    value === "abort" ||
    value === "audit" ||
    value === "recover" ||
    value === "release" ||
    value === "status"
  );
}

/** Decodes one release hash while preserving its owning option. */
function decodeManifestHash(
  option: "--manifest-hash" | "--recovery-manifest-hash",
  value: string
) {
  return Schema.decodeEffect(Sha256HashSchema)(value).pipe(
    Effect.mapError(() => argumentError("audit", option, "value"))
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
  if (command === "audit") {
    if (options.manifestHash === undefined) {
      return yield* argumentError(command, "--manifest-hash", "missing");
    }
    if (options.recoveryManifestHash === undefined) {
      return yield* argumentError(
        command,
        "--recovery-manifest-hash",
        "missing"
      );
    }
    return {
      command,
      manifestHash: yield* decodeManifestHash(
        "--manifest-hash",
        options.manifestHash
      ),
      recoveryId,
      recoveryManifestHash: yield* decodeManifestHash(
        "--recovery-manifest-hash",
        options.recoveryManifestHash
      ),
      releaseId,
    } satisfies AuditArguments;
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
