import {
  GitCommitShaSchema,
  type ReleaseId,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import type { TryoutHistoryMigrationProof } from "@nakafa/aksara-contracts/migration/tryout/history/proof";
import type { PublicationScope } from "@nakafa/aksara-contracts/release/snapshot/scope";
import { Effect, Schema } from "effect";
import { productionArgumentsError as argumentError } from "#cli/production/error";
import {
  parseProductionOptions,
  type RawProductionOptions,
} from "#cli/production/options";
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

/** Exact retained-history migration and exclusive public receipt destination. */
export interface MigrateTryoutHistoryArguments {
  readonly command: "migrate-tryout-history";
  readonly receiptPath: string;
  readonly releaseId: ReleaseId;
}

/** Exact externally durable receipt authorizing retained-history cleanup. */
export interface CleanupTryoutHistoryArguments {
  readonly command: "cleanup-tryout-history";
  readonly proof: TryoutHistoryMigrationProof;
  readonly receiptPath: string;
  readonly releaseId: ReleaseId;
}

/** Exact invisible retained-history staging root selected for abandonment. */
export interface AbortTryoutHistoryArguments {
  readonly command: "abort-tryout-history";
  readonly releaseId: ReleaseId;
}

/** Complete production command vocabulary accepted at the Aksara CLI boundary. */
export type ProductionArguments =
  | AcceptArguments
  | AbortArguments
  | AbortTryoutHistoryArguments
  | CleanupArguments
  | CleanupTryoutHistoryArguments
  | MigrateTryoutHistoryArguments
  | RecoverArguments
  | ReleaseArguments
  | StatusArguments;

export type ProductionCommand = ProductionArguments["command"];
type TryoutMigrationCommand =
  | CleanupTryoutHistoryArguments["command"]
  | MigrateTryoutHistoryArguments["command"];
/** Narrows a raw command token to the production command vocabulary. */
export function isProductionCommand(
  value: string | undefined
): value is ProductionCommand {
  return (
    value === "cleanup" ||
    value === "abort-tryout-history" ||
    value === "cleanup-tryout-history" ||
    value === "migrate-tryout-history" ||
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

/** Decodes the receipt and immutable-proof boundary for history migration. */
const parseTryoutMigrationArguments = Effect.fn(
  "AksaraCli.parseTryoutMigrationArguments"
)(function* (
  command: TryoutMigrationCommand,
  options: RawProductionOptions,
  releaseId: ReleaseId
) {
  if (options.receiptPath === undefined) {
    return yield* argumentError(command, "--receipt-path", "missing");
  }
  if (!options.receiptPath.startsWith("/")) {
    return yield* argumentError(command, "--receipt-path", "value");
  }
  if (command === "migrate-tryout-history") {
    return {
      command,
      receiptPath: options.receiptPath,
      releaseId,
    } satisfies MigrateTryoutHistoryArguments;
  }
  if (options.assetHash === undefined) {
    return yield* argumentError(command, "--asset-hash", "missing");
  }
  if (options.sourceSha === undefined) {
    return yield* argumentError(command, "--source-sha", "missing");
  }
  const assetHash = yield* Schema.decodeEffect(Sha256HashSchema)(
    options.assetHash
  ).pipe(
    Effect.mapError(() => argumentError(command, "--asset-hash", "value"))
  );
  const sourceSha = yield* Schema.decodeEffect(GitCommitShaSchema)(
    options.sourceSha
  ).pipe(
    Effect.mapError(() => argumentError(command, "--source-sha", "value"))
  );
  return {
    command,
    proof: { assetHash, sourceSha },
    receiptPath: options.receiptPath,
    releaseId,
  } satisfies CleanupTryoutHistoryArguments;
});

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
  if (command === "abort-tryout-history") {
    return { command, releaseId } satisfies AbortTryoutHistoryArguments;
  }
  if (
    command === "migrate-tryout-history" ||
    command === "cleanup-tryout-history"
  ) {
    return yield* parseTryoutMigrationArguments(command, options, releaseId);
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
