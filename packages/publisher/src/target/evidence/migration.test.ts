import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import { hasBoundMigration } from "#publisher/target/evidence/migration";
import { hasBoundPublicationSuccess } from "#publisher/target/evidence/response";
import { historicalArtifacts } from "#test/migration/artifact";
import {
  migrationProtocol,
  migrationResponse,
  otherHash,
  otherId,
} from "#test/migration/protocol";
import { historicalSource, migrationId } from "#test/migration/source";
import { migrationStatus } from "#test/migration/status";

describe("migration HTTP evidence", () => {
  it.effect("accepts every exact command-specific response", () =>
    Effect.gen(function* () {
      const exchanges = yield* migrationProtocol();
      expect(
        Object.values(exchanges).every((exchange) =>
          hasBoundMigration(exchange.request, exchange.response)
        )
      ).toBe(true);
      expect(
        hasBoundPublicationSuccess(
          exchanges.source.request,
          exchanges.source.response
        )
      ).toBe(true);
    })
  );

  it.effect(
    "rejects command, migration, count, and immutable identity drift",
    () =>
      Effect.gen(function* () {
        const exchanges = yield* migrationProtocol();
        const invalid = [
          {
            request: exchanges.source.request,
            response: migrationResponse({
              command: "status",
              migrationId,
              status: migrationStatus(),
            }),
          },
          {
            request: exchanges.source.request,
            response: migrationResponse({
              command: "source",
              migrationId: otherId,
              source: historicalSource,
            }),
          },
          {
            request: exchanges.initialize.request,
            response: migrationResponse({
              command: "initialize",
              migrationId,
              status: migrationStatus({ sourceSnapshotId: otherHash }),
            }),
          },
          {
            request: exchanges.artifact.request,
            response: migrationResponse({
              artifacts: [...historicalArtifacts].reverse(),
              command: "artifactBatch",
              migrationId,
            }),
          },
          {
            request: exchanges.stageArtifacts.request,
            response: migrationResponse({
              command: "stageArtifacts",
              created: 1,
              migrationId,
              unchanged: 0,
            }),
          },
          {
            request: exchanges.stageRows.request,
            response: migrationResponse({
              command: "stageRows",
              created: 0,
              migrationId,
              unchanged: 0,
            }),
          },
          {
            request: exchanges.snapshot.request,
            response: migrationResponse({
              command: "stageSnapshot",
              created: 1,
              migrationId,
              snapshotId: otherHash,
              unchanged: 0,
            }),
          },
          {
            request: exchanges.bundle.request,
            response: migrationResponse({
              bundleHash: otherHash,
              command: "stageBundle",
              created: 1,
              migrationId,
              unchanged: 0,
            }),
          },
        ];

        expect(
          invalid.map((exchange) =>
            hasBoundMigration(exchange.request, exchange.response)
          )
        ).toEqual(Array.from({ length: invalid.length }, () => false));
      })
  );
});
