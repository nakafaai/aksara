import { describe, expect, it } from "@effect/vitest";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import type { TryoutHistoryMigrationRequest } from "@nakafa/aksara-contracts/transport/migration/tryout/request";
import type { TryoutHistoryMigrationValue } from "@nakafa/aksara-contracts/transport/migration/tryout/response";
import { Effect } from "effect";
import { vi } from "vitest";

import {
  readHistoricalTryoutRows,
  readHistoricalTryoutSource,
} from "#publisher/migration/tryout/source";
import type { PublicationTarget } from "#publisher/publication/spec";
import {
  historicalCatalogEntries,
  historicalPlacementEntries,
} from "#test/migration/rows";
import {
  historicalSource,
  migrationId,
  sourceSnapshotId,
} from "#test/migration/source";
import { makePublicationTarget } from "#test/target";

const authentication = vi.hoisted(() => ({ fail: false, inventories: 0 }));

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

vi.mock("@nakafa/aksara-contracts/history/decode", async (importOriginal) => {
  const original =
    await importOriginal<
      typeof import("@nakafa/aksara-contracts/history/decode")
    >();
  const { Effect: TestEffect } = await import("effect");
  return {
    ...original,
    verifyStoredTryoutInventory: (inventory: unknown) => {
      authentication.inventories += 1;
      return TestEffect.succeed(inventory);
    },
  };
});

type Target = typeof PublicationTarget.Service;
type MigrationTarget = Target["migrateTryoutHistory"];
const resolver = ContentVerificationKeyResolver.of({
  resolve: () => Effect.succeed("unused-test-public-key"),
});

/** Builds one target exposing only the focused migration exchange. */
function targetWith(migrateTryoutHistory: MigrationTarget) {
  return makePublicationTarget({ migrateTryoutHistory });
}

/** Supplies the explicit retained-key trust seam to one source read. */
function readSource(target: Target) {
  return readHistoricalTryoutSource(target, migrationId).pipe(
    Effect.provideService(ContentVerificationKeyResolver, resolver)
  );
}

/** Projects the migration reason while preserving unexpected failure tags. */
function failureReason(failure: { readonly _tag: string }) {
  return failure._tag === "TryoutHistoryMigrationError" && "reason" in failure
    ? failure.reason
    : failure._tag;
}

/** Produces one complete row page for the requested retained kind. */
function completePage(
  request: TryoutHistoryMigrationRequest
): TryoutHistoryMigrationValue {
  if (request.command !== "rowPage") {
    return {
      command: "source",
      migrationId,
      source: historicalSource,
    };
  }
  return {
    command: "rowPage",
    isDone: true,
    migrationId,
    nextIndex: null,
    rowKind: request.rowKind,
    rows:
      request.rowKind === "catalog"
        ? historicalCatalogEntries
        : historicalPlacementEntries,
  };
}

describe("try-out history migration source", () => {
  it.effect("authenticates source bytes before exposing them", () =>
    Effect.gen(function* () {
      const target = targetWith(() =>
        Effect.succeed({
          command: "source",
          migrationId,
          source: historicalSource,
        })
      );

      expect(yield* readSource(target)).toEqual(historicalSource);

      authentication.fail = true;
      const provenance = yield* readSource(target).pipe(Effect.flip);
      authentication.fail = false;
      expect(failureReason(provenance)).toBe("provenance");

      const command = yield* readSource(
        targetWith(() =>
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
          })
        )
      ).pipe(Effect.flip);
      expect(failureReason(command)).toBe("command-evidence");
    })
  );

  it.effect(
    "reads contiguous source pages and reauthenticates the inventory",
    () =>
      Effect.gen(function* () {
        let catalogCalls = 0;
        const target = targetWith((request) => {
          if (request.command !== "rowPage") {
            return Effect.succeed(completePage(request));
          }
          if (request.rowKind === "catalog" && catalogCalls === 0) {
            catalogCalls += 1;
            return Effect.succeed({
              command: "rowPage",
              isDone: false,
              migrationId,
              nextIndex: 0,
              rowKind: "catalog",
              rows: historicalCatalogEntries,
            });
          }
          return Effect.succeed({
            ...completePage(request),
            rows:
              request.rowKind === "catalog" ? [] : historicalPlacementEntries,
          });
        });

        const rows = yield* readHistoricalTryoutRows(
          target,
          migrationId,
          historicalSource
        );
        expect(rows.catalog).toHaveLength(1);
        expect(rows.placements).toHaveLength(1);
        expect(authentication.inventories).toBe(1);
      })
  );

  it.effect("rejects command, row-kind, cursor, count, and index drift", () =>
    Effect.gen(function* () {
      const cases: readonly MigrationTarget[] = [
        () =>
          Effect.succeed({
            command: "source",
            migrationId,
            source: historicalSource,
          }),
        (request) =>
          Effect.succeed(
            request.command === "rowPage"
              ? {
                  ...completePage(request),
                  rowKind:
                    request.rowKind === "catalog" ? "placement" : "catalog",
                }
              : completePage(request)
          ),
        (request) =>
          Effect.succeed(
            request.command === "rowPage"
              ? {
                  command: "rowPage",
                  isDone: false,
                  migrationId,
                  nextIndex: null,
                  rowKind: request.rowKind,
                  rows: [],
                }
              : completePage(request)
          ),
        (request) =>
          Effect.succeed(
            request.command === "rowPage" && request.rowKind === "catalog"
              ? { ...completePage(request), rows: [] }
              : completePage(request)
          ),
        (request) =>
          Effect.succeed(
            request.command === "rowPage" && request.rowKind === "placement"
              ? {
                  ...completePage(request),
                  rows: historicalPlacementEntries.map((entry) => ({
                    ...entry,
                    index: 2,
                  })),
                }
              : completePage(request)
          ),
      ];
      const failures = yield* Effect.forEach(cases, (exchange) =>
        readHistoricalTryoutRows(
          targetWith(exchange),
          migrationId,
          historicalSource
        ).pipe(Effect.flip)
      );

      expect(failures.map(failureReason)).toEqual([
        "command-evidence",
        "command-evidence",
        "source-index",
        "source-count",
        "source-index",
      ]);
    })
  );

  it.effect("rejects rows whose envelopes contradict the requested kind", () =>
    Effect.gen(function* () {
      const targets = [
        targetWith((request) =>
          Effect.succeed(
            request.command === "rowPage" && request.rowKind === "catalog"
              ? {
                  ...completePage(request),
                  rows: historicalPlacementEntries,
                }
              : completePage(request)
          )
        ),
        targetWith((request) =>
          Effect.succeed(
            request.command === "rowPage" && request.rowKind === "placement"
              ? {
                  ...completePage(request),
                  rows: historicalCatalogEntries,
                }
              : completePage(request)
          )
        ),
      ];
      const failures = yield* Effect.forEach(targets, (target) =>
        readHistoricalTryoutRows(target, migrationId, historicalSource).pipe(
          Effect.flip
        )
      );

      expect(failures.map(failureReason)).toEqual([
        "source-index",
        "source-index",
      ]);
    })
  );
});
