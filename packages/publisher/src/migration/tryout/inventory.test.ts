import { beforeEach, describe, expect, it } from "@effect/vitest";
import type { TryoutHistoryMigrationRequest } from "@nakafa/aksara-contracts/transport/migration/tryout/request";
import type { TryoutHistoryMigrationValue } from "@nakafa/aksara-contracts/transport/migration/tryout/response";
import { Effect } from "effect";
import { vi } from "vitest";

import { readHistoricalTryoutRows } from "#publisher/migration/tryout/inventory";
import type { PublicationTarget } from "#publisher/publication/spec";
import { failureReason } from "#test/migration/error";
import {
  historicalCatalogEntries,
  historicalPlacementEntries,
} from "#test/migration/rows";
import { historicalSource, migrationId } from "#test/migration/source";
import { makePublicationTarget } from "#test/target";

const authentication = vi.hoisted(() => ({ inventories: 0 }));

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

/** Builds one target exposing only the focused migration exchange. */
function targetWith(migrateTryoutHistory: MigrationTarget) {
  return makePublicationTarget({ migrateTryoutHistory });
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

beforeEach(() => {
  authentication.inventories = 0;
});

describe("try-out history migration inventory", () => {
  it.effect(
    "reads contiguous source pages and reauthenticates the inventory",
    () =>
      Effect.gen(function* () {
        const pagedSource = {
          ...historicalSource,
          evidence: { ...historicalSource.evidence, catalogRowCount: 2 },
        };
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
          if (request.rowKind === "catalog") {
            return Effect.succeed({
              ...completePage(request),
              rows: historicalCatalogEntries.map((entry) => ({
                ...entry,
                index: 1,
              })),
            });
          }
          return Effect.succeed({
            ...completePage(request),
            rows: historicalPlacementEntries.map((entry) => ({
              ...entry,
              index: 2,
            })),
          });
        });

        const rows = yield* readHistoricalTryoutRows(
          target,
          migrationId,
          pagedSource
        );
        expect(rows.catalog).toHaveLength(2);
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
                  rows:
                    request.rowKind === "catalog"
                      ? [
                          ...historicalCatalogEntries,
                          ...historicalCatalogEntries,
                        ]
                      : historicalPlacementEntries,
                }
              : completePage(request)
          ),
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
              ? { ...completePage(request), isDone: false, nextIndex: 0 }
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
        "source-count",
        "command-evidence",
        "source-count",
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
