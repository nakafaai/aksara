import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
import { computeTryoutHistoryAbortLimit } from "@nakafa/aksara-contracts/migration/tryout/history/abort";
import type { TryoutHistoryMigrationStatus } from "@nakafa/aksara-contracts/transport/migration/tryout/response";
import { Effect } from "effect";

import { migrationFail } from "#publisher/migration/tryout/error";
import { PublicationTarget } from "#publisher/publication/spec";

type AbortableStatus = Extract<
  TryoutHistoryMigrationStatus,
  { readonly phase: "aborting" | "staging" }
>;

/** Reads current state while preserving exact missing-root semantics. */
const readAbortStatus = Effect.fn(
  "AksaraPublisher.readTryoutMigrationAbortStatus"
)(function* (target: typeof PublicationTarget.Service, migrationId: ReleaseId) {
  return yield* target
    .migrateTryoutHistory({
      command: "status",
      operation: "migrateTryoutHistory",
      releaseId: migrationId,
    })
    .pipe(
      Effect.flatMap((value) =>
        value.command === "status"
          ? Effect.succeed(value.status)
          : Effect.fail(migrationFail("command-evidence"))
      ),
      Effect.catchTag("PublicationTargetRejectedError", (error) =>
        error.rejection.code === "CONTENT_RELEASE_MISSING"
          ? Effect.succeed(null)
          : Effect.fail(error)
      )
    );
});

/** Sends one exact abort page and proves its response identity. */
const abortPage = Effect.fn("AksaraPublisher.abortTryoutMigrationPage")(
  function* (target: typeof PublicationTarget.Service, migrationId: ReleaseId) {
    const value = yield* target.migrateTryoutHistory({
      command: "abort",
      operation: "migrateTryoutHistory",
      releaseId: migrationId,
    });
    if (value.command !== "abort") {
      return yield* migrationFail("command-evidence");
    }
    if (value.migrationId !== migrationId) {
      return yield* migrationFail("status-evidence");
    }
    return value;
  }
);

/** Requires one missing root to resolve only through its final tombstone. */
const readAbortTombstone = Effect.fn(
  "AksaraPublisher.readTryoutMigrationAbortTombstone"
)(function* (target: typeof PublicationTarget.Service, migrationId: ReleaseId) {
  const value = yield* abortPage(target, migrationId);
  if (!value.done) {
    return yield* migrationFail("abort-limit");
  }
  return value;
});

/** Repeats only strictly progressing pages within the staged inventory bound. */
const drainAbort = Effect.fn("AksaraPublisher.drainTryoutMigrationAbort")(
  function* (
    target: typeof PublicationTarget.Service,
    migrationId: ReleaseId,
    status: AbortableStatus
  ) {
    const abortLimit = yield* computeTryoutHistoryAbortLimit(status).pipe(
      Effect.mapError(() => migrationFail("abort-limit"))
    );
    const deletionCeiling =
      (status.phase === "aborting" ? status.deleted : 0) + abortLimit;
    let deleted = status.phase === "aborting" ? status.deleted : 0;
    for (let call = 0; call < abortLimit; call += 1) {
      const value = yield* abortPage(target, migrationId);
      const nextDeleted = value.deleted;
      if (nextDeleted < deleted) {
        return yield* migrationFail("status-evidence");
      }
      if (nextDeleted > deletionCeiling) {
        return yield* migrationFail("abort-limit");
      }
      if (value.done) {
        return value;
      }
      if (nextDeleted === deleted) {
        return yield* migrationFail("abort-progress");
      }
      deleted = nextDeleted;
    }
    return yield* migrationFail("abort-limit");
  }
);

/** Abandons only invisible retained-history staging and returns final evidence. */
export const abortRetainedTryoutHistory = Effect.fn(
  "AksaraPublisher.abortRetainedTryoutHistory"
)((migrationId: ReleaseId) =>
  Effect.gen(function* () {
    const target = yield* PublicationTarget;
    const status = yield* readAbortStatus(target, migrationId);
    if (status === null) {
      return yield* readAbortTombstone(target, migrationId);
    }
    if (status.phase !== "staging" && status.phase !== "aborting") {
      return yield* migrationFail("status-evidence");
    }
    return yield* drainAbort(target, migrationId, status);
  })
);
