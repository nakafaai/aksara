import { Effect, Schema } from "effect";

import { hashText } from "#contracts/hash/text";
import {
  HistoricalTryoutInventorySchema,
  StoredTryoutInventoryCountMismatchError,
  StoredTryoutInventoryDecodeError,
  StoredTryoutInventoryDigestMismatchError,
  StoredTryoutInventoryHashError,
  type StoredTryoutInventoryKind,
  StoredTryoutInventoryOrderError,
  StoredTryoutInventorySnapshotMismatchError,
} from "#contracts/history/inventory-spec";
import {
  compareHistoricalCodeUnits,
  type HistoricalSha256HashSchema,
} from "#contracts/history/primitives";
import {
  decodeStoredTryoutRow,
  decodeStoredTryoutSnapshot,
} from "#contracts/history/read";
import type { HistoricalTryoutSnapshot } from "#contracts/history/tryout";
import {
  canonicalizeHistoricalTryoutCatalog,
  canonicalizeHistoricalTryoutPlacement,
  HISTORICAL_TRYOUT_CATALOG_DOMAIN,
  HISTORICAL_TRYOUT_PLACEMENT_DOMAIN,
} from "#contracts/history/tryout-bytes";
import type {
  HistoricalTryoutCatalogEnvelope,
  HistoricalTryoutCatalogRow,
  HistoricalTryoutPlacement,
  HistoricalTryoutPlacementEnvelope,
} from "#contracts/history/tryout-row";

/** Reconstructs the exact old catalog ordering identity. */
function historicalCatalogIdentity(row: HistoricalTryoutCatalogRow) {
  return [
    row.locale,
    row.kind,
    row.countryKey,
    "examKey" in row ? row.examKey : "",
    "trackKey" in row ? row.trackKey : "",
    "setKey" in row ? row.setKey : "",
    "sectionKey" in row ? row.sectionKey : "",
  ].join("\0");
}

/** Reconstructs the exact old placement ordering identity. */
function historicalPlacementIdentity(row: HistoricalTryoutPlacement) {
  return [
    row.countryKey,
    row.examKey,
    row.trackKey,
    row.setKey,
    row.sectionKey,
    row.questionOrder,
    row.questionContentKey,
    row.locale,
  ].join("\0");
}

/** Fails when one retained identity is not strictly after its predecessor. */
function verifyHistoricalOrder(
  previousIdentity: string | undefined,
  identity: string,
  rowKind: "catalog" | "placement"
) {
  if (
    previousIdentity === undefined ||
    compareHistoricalCodeUnits(previousIdentity, identity) < 0
  ) {
    return Effect.succeed(identity);
  }
  return Effect.fail(
    new StoredTryoutInventoryOrderError({
      identity,
      previousIdentity,
      rowKind,
    })
  );
}

/** Hashes one exact ordered inventory through its frozen aggregate domain. */
const digestHistoricalInventory = Effect.fn(
  "AksaraContracts.digestStoredTryoutInventory"
)(function* <Row>(input: {
  /** Serializes one frozen row into the exact old digest bytes. */
  readonly canonicalize: (row: Row) => string;
  readonly domain: string;
  /** Reconstructs the exact old ordering identity for one row. */
  readonly identity: (row: Row) => string;
  readonly records: readonly {
    readonly record: { readonly row: Row; readonly rowHash: string };
  }[];
  readonly rowKind: "catalog" | "placement";
}) {
  const parts = [input.domain, "\n"];
  let previousIdentity: string | undefined;
  for (const { record } of input.records) {
    const identity = input.identity(record.row);
    previousIdentity = yield* verifyHistoricalOrder(
      previousIdentity,
      identity,
      input.rowKind
    );
    parts.push(input.canonicalize(record.row), "\0", record.rowHash, "\n");
  }
  return yield* hashText(parts.join("")).pipe(
    Effect.mapError(
      () => new StoredTryoutInventoryHashError({ rowKind: input.rowKind })
    )
  );
});

/** Counts one catalog kind and proves it matches the authenticated snapshot. */
function verifyCount(
  actual: number,
  expected: number,
  kind: StoredTryoutInventoryKind
) {
  if (actual === expected) {
    return Effect.void;
  }
  return Effect.fail(
    new StoredTryoutInventoryCountMismatchError({ actual, expected, kind })
  );
}

/** Counts exact catalog kinds and public routes in one retained inventory. */
function summarizeCatalog(catalog: readonly HistoricalTryoutCatalogEnvelope[]) {
  const summary = {
    country: 0,
    exam: 0,
    route: 0,
    section: 0,
    set: 0,
    track: 0,
  };
  for (const { record } of catalog) {
    summary[record.row.kind] += 1;
    if ("publicPath" in record.row && record.row.publicPath !== undefined) {
      summary.route += 1;
    }
  }
  return summary;
}

/** Proves every retained catalog count against one authenticated snapshot. */
const verifyCatalogCounts = Effect.fn(
  "AksaraContracts.verifyStoredTryoutCatalogCounts"
)(function* (
  snapshot: HistoricalTryoutSnapshot,
  catalog: readonly HistoricalTryoutCatalogEnvelope[]
) {
  const summary = summarizeCatalog(catalog);
  const expectedCatalogCount = Object.values(snapshot.counts).reduce(
    (total, count) => total + count,
    0
  );
  yield* verifyCount(catalog.length, expectedCatalogCount, "catalog");
  yield* verifyCount(summary.country, snapshot.counts.country, "country");
  yield* verifyCount(summary.exam, snapshot.counts.exam, "exam");
  yield* verifyCount(summary.track, snapshot.counts.track, "track");
  yield* verifyCount(summary.set, snapshot.counts.set, "set");
  yield* verifyCount(summary.section, snapshot.counts.section, "section");
  yield* verifyCount(summary.route, snapshot.routeCount, "route");
});

/** Proves one aggregate digest equals its authenticated snapshot commitment. */
function verifyDigest(
  actualHash: typeof HistoricalSha256HashSchema.Type,
  expectedHash: typeof HistoricalSha256HashSchema.Type,
  rowKind: "catalog" | "placement"
) {
  if (actualHash === expectedHash) {
    return Effect.void;
  }
  return Effect.fail(
    new StoredTryoutInventoryDigestMismatchError({
      actualHash,
      expectedHash,
      rowKind,
    })
  );
}

/** Proves the signed release selected this content-addressed snapshot. */
function verifyExpectedSnapshot(
  expectedSnapshotId: typeof HistoricalSha256HashSchema.Type,
  snapshot: HistoricalTryoutSnapshot
) {
  if (snapshot.snapshotId === expectedSnapshotId) {
    return Effect.void;
  }
  return Effect.fail(
    new StoredTryoutInventorySnapshotMismatchError({
      actualSnapshotId: snapshot.snapshotId,
      expectedSnapshotId,
    })
  );
}

/** Reauthenticates every retained row before aggregate verification. */
function authenticateRows(
  catalog: readonly HistoricalTryoutCatalogEnvelope[],
  placements: readonly HistoricalTryoutPlacementEnvelope[]
) {
  return Effect.all(
    [
      Effect.forEach(catalog, decodeStoredTryoutRow, {
        concurrency: 16,
        discard: true,
      }),
      Effect.forEach(placements, decodeStoredTryoutRow, {
        concurrency: 16,
        discard: true,
      }),
    ],
    { discard: true }
  );
}

/**
 * Authenticates a complete retained try-out inventory against its snapshot.
 * Current writers and new attempts cannot import this history-only operation.
 */
export const verifyStoredTryoutInventory = Effect.fn(
  "AksaraContracts.verifyStoredTryoutInventory"
)(function* (input: unknown) {
  const inventory = yield* Schema.decodeUnknown(
    HistoricalTryoutInventorySchema
  )(input, { onExcessProperty: "error" }).pipe(
    Effect.mapError(() => new StoredTryoutInventoryDecodeError())
  );
  const snapshot = yield* decodeStoredTryoutSnapshot(inventory.snapshot);
  yield* verifyExpectedSnapshot(inventory.expectedSnapshotId, snapshot);
  yield* verifyCatalogCounts(snapshot, inventory.catalog);
  yield* verifyCount(
    inventory.placements.length,
    snapshot.placementCount,
    "placement"
  );
  yield* authenticateRows(inventory.catalog, inventory.placements);
  const [catalogDigest, placementDigest] = yield* Effect.all([
    digestHistoricalInventory({
      canonicalize: canonicalizeHistoricalTryoutCatalog,
      domain: HISTORICAL_TRYOUT_CATALOG_DOMAIN,
      identity: historicalCatalogIdentity,
      records: inventory.catalog,
      rowKind: "catalog",
    }),
    digestHistoricalInventory({
      canonicalize: canonicalizeHistoricalTryoutPlacement,
      domain: HISTORICAL_TRYOUT_PLACEMENT_DOMAIN,
      identity: historicalPlacementIdentity,
      records: inventory.placements,
      rowKind: "placement",
    }),
  ]);
  yield* verifyDigest(catalogDigest, snapshot.catalogDigest, "catalog");
  yield* verifyDigest(placementDigest, snapshot.placementDigest, "placement");
  return inventory;
});
