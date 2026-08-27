import {
  type StoredTryoutCatalogRow,
  type StoredTryoutPlacementRow,
  verifyStoredTryoutInventory,
} from "@nakafa/aksara-contracts/history/decode";
import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
import { verifyTryoutHistoryMigrationSource } from "@nakafa/aksara-contracts/migration/tryout/history/source";
import type {
  TryoutHistoryMigrationSource,
  TryoutHistoryMigrationValue,
} from "@nakafa/aksara-contracts/transport/migration/tryout/response";
import { Effect } from "effect";
import { migrationFail } from "#publisher/migration/tryout/error";
import type { PublicationTarget } from "#publisher/publication/spec";

/** One authenticated historical row bound to its retained global index. */
export interface IndexedHistoricalRow<Row> {
  readonly index: number;
  readonly row: Row;
}

/** Complete authenticated retained rows used by the offline conversion. */
export interface HistoricalTryoutRows {
  readonly catalog: readonly IndexedHistoricalRow<StoredTryoutCatalogRow>[];
  readonly placements: readonly IndexedHistoricalRow<StoredTryoutPlacementRow>[];
}

type Target = typeof PublicationTarget.Service;
type RowPageValue = Extract<
  TryoutHistoryMigrationValue,
  { readonly command: "rowPage" }
>;

/** Reads the source inventory response bound by the HTTP target contract. */
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

/** Reads one complete historical row kind through bounded contiguous pages. */
const readRowKind = Effect.fn("AksaraPublisher.readHistoricalTryoutRows")(
  function* (
    target: Target,
    migrationId: ReleaseId,
    sourceSnapshotId: TryoutHistoryMigrationSource["evidence"]["snapshot"]["snapshotId"],
    rowKind: "catalog" | "placement"
  ) {
    const rows: RowPageValue["rows"][number][] = [];
    let afterIndex = -1;
    let isDone = false;
    while (!isDone) {
      const value = yield* target.migrateTryoutHistory({
        afterIndex,
        command: "rowPage",
        operation: "migrateTryoutHistory",
        releaseId: migrationId,
        rowKind,
        sourceSnapshotId,
      });
      if (value.command !== "rowPage" || value.rowKind !== rowKind) {
        return yield* migrationFail("command-evidence");
      }
      for (const entry of value.rows) {
        rows.push(entry);
      }
      const { isDone: pageDone, nextIndex, rows: pageRows } = value;
      isDone = pageDone;
      if (!isDone) {
        if (nextIndex === null || pageRows.length === 0) {
          return yield* migrationFail("source-index");
        }
        afterIndex = nextIndex;
      }
    }
    return rows;
  }
);

/** Proves retained global indices remain complete and contiguous. */
function hasExactIndices(
  rows: readonly IndexedHistoricalRow<unknown>[],
  firstIndex: number
) {
  return rows.every(({ index }, offset) => index === firstIndex + offset);
}

/** Loads and reauthenticates the complete retained snapshot inventory. */
export const readHistoricalTryoutRows = Effect.fn(
  "AksaraPublisher.readHistoricalTryoutInventory"
)(function* (
  target: Target,
  migrationId: ReleaseId,
  source: TryoutHistoryMigrationSource
) {
  const [catalogEntries, placementEntries] = yield* Effect.all([
    readRowKind(
      target,
      migrationId,
      source.evidence.snapshot.snapshotId,
      "catalog"
    ),
    readRowKind(
      target,
      migrationId,
      source.evidence.snapshot.snapshotId,
      "placement"
    ),
  ]);
  const catalog = yield* Effect.forEach(catalogEntries, (entry) =>
    entry.row.rowKind === "catalog"
      ? Effect.succeed({ index: entry.index, row: entry.row })
      : migrationFail("source-index")
  );
  const placements = yield* Effect.forEach(placementEntries, (entry) =>
    entry.row.rowKind === "placement"
      ? Effect.succeed({ index: entry.index, row: entry.row })
      : migrationFail("source-index")
  );
  if (
    catalog.length !== source.evidence.catalogRowCount ||
    placements.length !== source.evidence.placementRowCount
  ) {
    return yield* migrationFail("source-count");
  }
  if (
    !(
      hasExactIndices(catalog, 0) && hasExactIndices(placements, catalog.length)
    )
  ) {
    return yield* migrationFail("source-index");
  }
  yield* verifyStoredTryoutInventory({
    catalog: catalog.map(({ row }) => row),
    expectedSnapshotId: source.evidence.snapshot.snapshotId,
    placements: placements.map(({ row }) => row),
    snapshot: source.evidence.snapshot,
  });
  return { catalog, placements } satisfies HistoricalTryoutRows;
});
