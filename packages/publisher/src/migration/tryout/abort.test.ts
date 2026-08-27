import { assert, describe, it } from "@effect/vitest";
import type {
  TryoutHistoryMigrationStatus,
  TryoutHistoryMigrationValue,
} from "@nakafa/aksara-contracts/transport/migration/tryout/response";
import { Effect } from "effect";

import { abortRetainedTryoutHistory } from "#publisher/migration/tryout/abort";
import { PublicationTarget } from "#publisher/publication/spec";
import { failureReason } from "#test/migration/error";
import { migrationRejection } from "#test/migration/flow";
import { otherId } from "#test/migration/protocol";
import { migrationId } from "#test/migration/source";
import {
  abortingMigrationStatus,
  migrationStatus,
  readyMigrationStatus,
} from "#test/migration/status";
import { makePublicationTarget } from "#test/target";

/** Runs the public operation with one isolated target implementation. */
const runAbort = (target: typeof PublicationTarget.Service) =>
  abortRetainedTryoutHistory(migrationId).pipe(
    Effect.provideService(PublicationTarget, target)
  );

/** Serves one status and optional abort response for focused lifecycle tests. */
function statusTarget(
  status: TryoutHistoryMigrationStatus,
  abort?: () => TryoutHistoryMigrationValue
) {
  return makePublicationTarget({
    migrateTryoutHistory: (request) => {
      if (request.command === "status") {
        return Effect.succeed({
          command: request.command,
          migrationId,
          status,
        });
      }
      if (request.command === "abort" && abort !== undefined) {
        return Effect.succeed(abort());
      }
      return Effect.die(`Unexpected ${request.command} command.`);
    },
  });
}

/** Serves an absent root followed by one tombstone response. */
function missingTarget(abort: () => TryoutHistoryMigrationValue) {
  return makePublicationTarget({
    migrateTryoutHistory: (request) =>
      request.command === "status"
        ? Effect.fail(migrationRejection("CONTENT_RELEASE_MISSING"))
        : Effect.succeed(abort()),
  });
}

describe("try-out history staging abort", () => {
  it.effect(
    "drains strictly progressing pages within the inventory bound",
    () =>
      Effect.gen(function* () {
        const deleted = [4, 7] as const;
        let abortCalls = 0;
        const target = makePublicationTarget({
          migrateTryoutHistory: (request) => {
            if (request.command === "status") {
              return Effect.succeed({
                command: request.command,
                migrationId,
                status: migrationStatus({
                  artifactMapCount: 2,
                  catalogMapCount: 1,
                }),
              });
            }
            if (request.command === "abort") {
              const current = deleted[abortCalls];
              abortCalls += 1;
              return current === undefined
                ? Effect.die("Abort exceeded the fixture.")
                : Effect.succeed({
                    command: request.command,
                    deleted: current,
                    done: abortCalls === deleted.length,
                    migrationId,
                  });
            }
            return Effect.die(`Unexpected ${request.command} command.`);
          },
        });

        const result = yield* runAbort(target);

        assert.deepStrictEqual(result, {
          command: "abort",
          deleted: 7,
          done: true,
          migrationId,
        });
        assert.strictEqual(abortCalls, 2);
      })
  );

  it.effect("resumes from the server cumulative deletion counter", () =>
    Effect.gen(function* () {
      const target = statusTarget(
        abortingMigrationStatus({ artifactMapCount: 1, deleted: 4 }),
        () => ({ command: "abort", deleted: 5, done: true, migrationId })
      );

      const result = yield* runAbort(target);

      assert.strictEqual(result.deleted, 5);
    })
  );

  it.effect("recovers a missing root only through its final tombstone", () =>
    Effect.gen(function* () {
      const target = missingTarget(() => ({
        command: "abort",
        deleted: 12,
        done: true,
        migrationId,
      }));

      const result = yield* runAbort(target);

      assert.strictEqual(result.deleted, 12);
    })
  );

  it.effect("requires a missing root tombstone to be terminal", () =>
    Effect.gen(function* () {
      const target = missingTarget(() => ({
        command: "abort",
        deleted: 1,
        done: false,
        migrationId,
      }));
      const failure = yield* runAbort(target).pipe(Effect.flip);

      assert.strictEqual(failureReason(failure), "abort-limit");
    })
  );

  it.effect("rejects any authorized or terminal migration phase", () =>
    Effect.gen(function* () {
      const target = statusTarget(readyMigrationStatus());
      const failure = yield* runAbort(target).pipe(Effect.flip);

      assert.strictEqual(failureReason(failure), "status-evidence");
    })
  );

  it.effect("fails closed on stalled, regressed, or excessive progress", () =>
    Effect.gen(function* () {
      const cases = [
        { deleted: 0, initial: 0, reason: "abort-progress" },
        { deleted: 3, initial: 4, reason: "status-evidence" },
        { deleted: 8, initial: 4, reason: "abort-limit" },
      ] as const;

      yield* Effect.forEach(cases, ({ deleted, initial = 0, reason }) => {
        const status =
          initial === 0
            ? migrationStatus()
            : abortingMigrationStatus({ deleted: initial });
        const target = statusTarget(status, () => ({
          command: "abort",
          deleted,
          done: false,
          migrationId,
        }));
        return runAbort(target).pipe(
          Effect.flip,
          Effect.map((failure) =>
            assert.strictEqual(failureReason(failure), reason)
          )
        );
      });
    })
  );

  it.effect("rejects status and abort response identity drift", () =>
    Effect.gen(function* () {
      const cases = [
        {
          abort: {
            command: "status" as const,
            migrationId,
            status: migrationStatus(),
          },
          reason: "command-evidence",
          status: migrationStatus(),
        },
        {
          abort: {
            command: "abort" as const,
            deleted: 1,
            done: true,
            migrationId: otherId,
          },
          reason: "status-evidence",
          status: migrationStatus(),
        },
        {
          abort: null,
          reason: "command-evidence",
          status: {
            command: "abort" as const,
            deleted: 0,
            done: true,
            migrationId,
          },
        },
      ] as const;

      yield* Effect.forEach(cases, ({ abort, reason, status }) => {
        const target = makePublicationTarget({
          migrateTryoutHistory: (request) => {
            if (request.command === "status") {
              return "phase" in status
                ? Effect.succeed({
                    command: request.command,
                    migrationId,
                    status,
                  })
                : Effect.succeed(status);
            }
            if (request.command === "abort" && abort !== null) {
              return Effect.succeed(abort);
            }
            return Effect.die(`Unexpected ${request.command} command.`);
          },
        });
        return runAbort(target).pipe(
          Effect.flip,
          Effect.map((failure) =>
            assert.strictEqual(failureReason(failure), reason)
          )
        );
      });
    })
  );

  it.effect("propagates a stable nonmissing status rejection", () =>
    Effect.gen(function* () {
      const target = makePublicationTarget({
        migrateTryoutHistory: (request) =>
          request.command === "status"
            ? Effect.fail(migrationRejection("CONTENT_RELEASE_STATE"))
            : Effect.die("Abort must not start."),
      });
      const failure = yield* runAbort(target).pipe(Effect.flip);

      assert.strictEqual(failure._tag, "PublicationTargetRejectedError");
    })
  );

  it.effect("rejects an unsafe inventory ceiling before mutation", () =>
    Effect.gen(function* () {
      const target = statusTarget(
        migrationStatus({ artifactMapCount: Number.MAX_SAFE_INTEGER })
      );
      const failure = yield* runAbort(target).pipe(Effect.flip);

      assert.strictEqual(failureReason(failure), "abort-limit");
    })
  );

  it.effect("fails when every allowed page progresses without completion", () =>
    Effect.gen(function* () {
      let calls = 0;
      const target = statusTarget(migrationStatus(), () => {
        calls += 1;
        return { command: "abort", deleted: calls, done: false, migrationId };
      });
      const failure = yield* runAbort(target).pipe(Effect.flip);

      assert.strictEqual(failureReason(failure), "abort-limit");
      assert.strictEqual(calls, 3);
    })
  );
});
