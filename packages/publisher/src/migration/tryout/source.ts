import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
import { verifyTryoutHistoryMigrationSource } from "@nakafa/aksara-contracts/migration/tryout/history/source";
import { Effect } from "effect";

import { migrationFail } from "#publisher/migration/tryout/error";
import type { PublicationTarget } from "#publisher/publication/spec";

type Target = typeof PublicationTarget.Service;

/** Reads and authenticates the retained source inventory envelope. */
export const readHistoricalTryoutSource = Effect.fn(
  "AksaraPublisher.readHistoricalTryoutSource"
)(function* (target: Target, migrationId: ReleaseId) {
  const value = yield* target.migrateTryoutHistory({
    command: "source",
    operation: "migrateTryoutHistory",
    releaseId: migrationId,
  });
  if (value.command !== "source") {
    return yield* migrationFail("command-evidence");
  }
  return yield* verifyTryoutHistoryMigrationSource(value.source).pipe(
    Effect.mapError(() => migrationFail("provenance"))
  );
});
