import { describe, expect, it } from "@effect/vitest";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect } from "effect";
import { vi } from "vitest";

import { readHistoricalTryoutSource } from "#publisher/migration/tryout/source";
import type { PublicationTarget } from "#publisher/publication/spec";
import { failureReason } from "#test/migration/error";
import {
  historicalSource,
  migrationId,
  sourceSnapshotId,
} from "#test/migration/source";
import { makePublicationTarget } from "#test/target";

const authentication = vi.hoisted(() => ({ fail: false }));

vi.mock(
  "@nakafa/aksara-contracts/migration/tryout/history/source",
  async (importOriginal) => {
    const original =
      await importOriginal<
        typeof import("@nakafa/aksara-contracts/migration/tryout/history/source")
      >();
    const { Effect: TestEffect } = await import("effect");
    return {
      ...original,
      verifyTryoutHistoryMigrationSource: (source: unknown) =>
        authentication.fail
          ? TestEffect.fail({ _tag: "TestSourceAuthenticationError" as const })
          : TestEffect.succeed(source),
    };
  }
);

type Target = typeof PublicationTarget.Service;
const resolver = ContentVerificationKeyResolver.of({
  resolve: () => Effect.succeed("unused-test-public-key"),
});

/** Supplies the explicit retained-key trust seam to one source read. */
function readSource(target: Target) {
  return readHistoricalTryoutSource(target, migrationId).pipe(
    Effect.provideService(ContentVerificationKeyResolver, resolver)
  );
}

describe("try-out history migration source", () => {
  it.effect("authenticates source bytes before exposing them", () =>
    Effect.gen(function* () {
      const target = makePublicationTarget({
        migrateTryoutHistory: () =>
          Effect.succeed({
            command: "source",
            migrationId,
            source: historicalSource,
          }),
      });

      expect(yield* readSource(target)).toEqual(historicalSource);

      authentication.fail = true;
      const provenance = yield* readSource(target).pipe(Effect.flip);
      authentication.fail = false;
      expect(failureReason(provenance)).toBe("provenance");

      const command = yield* readSource(
        makePublicationTarget({
          migrateTryoutHistory: () =>
            Effect.succeed({
              command: "status",
              migrationId,
              status: {
                artifactMapCount: 0,
                catalogMapCount: 0,
                completion: null,
                migrationId,
                phase: "staging",
                placementMapCount: 0,
                planHash: null,
                sourceSnapshotId,
                targetBundleHash: null,
                targetSnapshotId: null,
              },
            }),
        })
      ).pipe(Effect.flip);
      expect(failureReason(command)).toBe("command-evidence");
    })
  );
});
