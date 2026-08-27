import { describe, expect, it } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import type { TryoutHistoryMigrationRequest } from "@nakafa/aksara-contracts/transport/migration/tryout/request";
import { Effect, Stream } from "effect";

import type { ConvertedTryoutArtifact } from "#publisher/migration/tryout/artifact";
import {
  initializeTryoutMigration,
  isMigrationRunnable,
  stageTryoutMigration,
} from "#publisher/migration/tryout/stage";
import type { ReplaySpool } from "#publisher/replay/spool";
import { convertedArtifacts } from "#test/migration/converted";
import {
  migrationSigner,
  migrationVerificationResolver,
} from "#test/migration/signing";
import { historicalSource, migrationId } from "#test/migration/source";
import { migrationStatus } from "#test/migration/status";
import { makeMigrationTarget } from "#test/migration/target";
import { makePublicationTarget } from "#test/target";

type MigrationCommand = TryoutHistoryMigrationRequest["command"];

const spool: ReplaySpool<ConvertedTryoutArtifact> = {
  bytes: 1,
  count: convertedArtifacts.length,
  read: (index) => {
    const value = convertedArtifacts[index];
    return value === undefined
      ? Effect.die("Expected one converted artifact fixture.")
      : Effect.succeed(value);
  },
  replay: Stream.fromIterable(convertedArtifacts),
};
const authorizationHash = Sha256HashSchema.make(`sha256:${"0".repeat(64)}`);

/** Returns the migration reason without hiding an unexpected failure tag. */
function failureReason(failure: { readonly _tag: string }) {
  return failure._tag === "TryoutHistoryMigrationError" && "reason" in failure
    ? failure.reason
    : failure._tag;
}

/** Executes valid staging, optionally substituting one contradictory reply. */
const run = Effect.fn("AksaraPublisherTest.stageMigration")(function* (
  drift?: MigrationCommand,
  driftPlanCount = false
) {
  const commands: MigrationCommand[] = [];
  const { prepared, rows, source } = yield* makeMigrationTarget();
  const target = makePublicationTarget({
    migrateTryoutHistory: (request) => {
      commands.push(request.command);
      if (request.command === drift) {
        return Effect.succeed({
          command: "source",
          migrationId,
          source: historicalSource,
        });
      }
      switch (request.command) {
        case "stageBundle":
          return Effect.succeed({
            bundleHash: request.bundle.bundleHash,
            command: request.command,
            created: 1,
            migrationId,
            unchanged: 0,
          });
        case "stageArtifacts":
        case "stageRows":
          return Effect.succeed({
            command: request.command,
            created: request.mappings.length,
            migrationId,
            unchanged: 0,
          });
        case "stageSnapshot":
          return Effect.succeed({
            command: request.command,
            created: 1,
            migrationId,
            snapshotId: request.snapshot.snapshotId,
            unchanged: 0,
          });
        case "stagePlan":
          return Effect.succeed({
            command: request.command,
            migrationId,
            status: migrationStatus({
              artifactMapCount:
                prepared.evidence.artifacts.count + (driftPlanCount ? 1 : 0),
              catalogMapCount: prepared.evidence.catalog.count,
              phase: "ready",
              placementMapCount: prepared.evidence.placements.count,
              planHash: request.plan.planHash,
              targetBundleHash: prepared.evidence.bundleHash,
              targetSnapshotId: prepared.evidence.snapshot.snapshotId,
            }),
          });
        default:
          return Effect.die(`Unexpected ${request.command} command.`);
      }
    },
  });
  const status = yield* stageTryoutMigration({
    artifacts: spool,
    migrationId,
    prepared,
    rows,
    signer: migrationSigner,
    source,
    target,
  }).pipe(
    Effect.provideService(
      ContentVerificationKeyResolver,
      migrationVerificationResolver
    )
  );
  return { commands, status };
});

describe("try-out history migration staging", () => {
  it.effect("stages permanent evidence before signed authorization", () =>
    Effect.gen(function* () {
      const { commands, status } = yield* run();

      expect(commands).toEqual([
        "stageBundle",
        "stageArtifacts",
        "stageRows",
        "stageRows",
        "stageSnapshot",
        "stagePlan",
      ]);
      expect(status.phase).toBe("ready");
      expect(status.artifactMapCount).toBe(2);
    })
  );

  it.effect("binds initialization to staging and the exact source", () =>
    Effect.gen(function* () {
      const target = makePublicationTarget({
        migrateTryoutHistory: (request) =>
          request.command === "initialize"
            ? Effect.succeed({
                command: request.command,
                migrationId,
                status: migrationStatus(),
              })
            : Effect.die("Expected initialize."),
      });
      const status = yield* initializeTryoutMigration(
        target,
        migrationId,
        historicalSource
      );
      const mismatch = makePublicationTarget({
        migrateTryoutHistory: () =>
          Effect.succeed({
            command: "source",
            migrationId,
            source: historicalSource,
          }),
      });
      const failure = yield* initializeTryoutMigration(
        mismatch,
        migrationId,
        historicalSource
      ).pipe(Effect.flip);

      expect(status.phase).toBe("staging");
      expect(failureReason(failure)).toBe("status-evidence");
    })
  );

  it.effect(
    "rejects contradictory command evidence at every staging seam",
    () =>
      Effect.gen(function* () {
        const failures = yield* Effect.forEach(
          [
            "stageBundle",
            "stageArtifacts",
            "stageRows",
            "stageSnapshot",
            "stagePlan",
          ] as const,
          (command) => run(command).pipe(Effect.flip)
        );

        expect(failures.map(failureReason)).toEqual([
          "command-evidence",
          "command-evidence",
          "command-evidence",
          "command-evidence",
          "status-evidence",
        ]);
      })
  );

  it.effect("rejects an unauthenticated permanent runtime before staging", () =>
    Effect.gen(function* () {
      const { prepared, rows, source } = yield* makeMigrationTarget();
      const target = makePublicationTarget({
        migrateTryoutHistory: () =>
          Effect.die("Runtime verification must precede target staging."),
      });
      const failure = yield* stageTryoutMigration({
        artifacts: spool,
        migrationId,
        prepared: {
          ...prepared,
          bundle: {
            ...prepared.bundle,
            bundleHash: Sha256HashSchema.make(`sha256:${"0".repeat(64)}`),
          },
        },
        rows,
        signer: migrationSigner,
        source,
        target,
      }).pipe(
        Effect.provideService(
          ContentVerificationKeyResolver,
          migrationVerificationResolver
        ),
        Effect.flip
      );

      expect(failureReason(failure)).toBe("target-evidence");
    })
  );

  it.effect("rejects ready state with incomplete staged map evidence", () =>
    Effect.gen(function* () {
      const failure = yield* run(undefined, true).pipe(Effect.flip);

      expect(failureReason(failure)).toBe("status-evidence");
    })
  );

  it("narrows only complete ready and running authorization state", () => {
    const authorization = {
      planHash: authorizationHash,
      targetBundleHash: authorizationHash,
      targetSnapshotId: authorizationHash,
    };
    expect(
      isMigrationRunnable(migrationStatus({ ...authorization, phase: "ready" }))
    ).toBe(true);
    expect(
      isMigrationRunnable(
        migrationStatus({ ...authorization, phase: "running" })
      )
    ).toBe(true);
    expect(isMigrationRunnable(migrationStatus({ phase: "ready" }))).toBe(
      false
    );
    expect(isMigrationRunnable(migrationStatus({ phase: "staging" }))).toBe(
      false
    );
    expect(
      isMigrationRunnable(
        migrationStatus({ ...authorization, phase: "completed" })
      )
    ).toBe(false);
  });
});
