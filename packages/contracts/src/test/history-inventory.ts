import { createHash } from "node:crypto";

import { Schema } from "effect";

import { HistoricalSha256HashSchema } from "#contracts/history/primitives";
import {
  canonicalizeHistoricalTryoutSnapshot,
  type HistoricalTryoutSnapshot,
  HistoricalTryoutSnapshotSchema,
} from "#contracts/history/tryout";
import {
  canonicalizeHistoricalTryoutCatalog,
  canonicalizeHistoricalTryoutPlacement,
} from "#contracts/history/tryout-bytes";
import {
  type HistoricalTryoutCatalogEnvelope,
  HistoricalTryoutCatalogEnvelopeSchema,
  type HistoricalTryoutCatalogRow,
  type HistoricalTryoutPlacement,
  type HistoricalTryoutPlacementEnvelope,
  HistoricalTryoutPlacementEnvelopeSchema,
} from "#contracts/history/tryout-row";
import {
  retainedTryoutCatalogRow,
  retainedTryoutPlacementRow,
  retainedTryoutPlacementWithHashRow,
} from "#contracts/test/history";
import {
  historicalCatalogRows,
  historicalInternalSection,
  historicalPlacement,
} from "#contracts/test/history-row";

const CATALOG_DOMAIN = "nakafa.aksara.tryout-catalog.v1";
const PLACEMENT_DOMAIN = "nakafa.aksara.tryout-placements.v1";
const SNAPSHOT_DOMAIN = "nakafa.aksara.tryout-snapshot.v1";

/** Computes one independent test-only SHA-256 wire value. */
function hashText(value: string) {
  return HistoricalSha256HashSchema.make(
    `sha256:${createHash("sha256").update(value).digest("hex")}`
  );
}

/** Compares test identities through exact JavaScript code-unit order. */
function compareCodeUnits(left: string, right: string) {
  if (left < right) {
    return -1;
  }
  if (left > right) {
    return 1;
  }
  return 0;
}

/** Reconstructs one exact retained catalog ordering identity. */
function catalogIdentity(row: HistoricalTryoutCatalogRow) {
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

/** Reconstructs one exact retained placement ordering identity. */
function placementIdentity(row: HistoricalTryoutPlacement) {
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

/** Wraps one catalog row in its exact frozen envelope. */
export function historicalCatalogEnvelope(
  row: HistoricalTryoutCatalogRow
): HistoricalTryoutCatalogEnvelope {
  const canonical = canonicalizeHistoricalTryoutCatalog(row);
  return {
    family: "tryout",
    record: {
      row,
      rowHash: hashText(`${CATALOG_DOMAIN}\n${canonical}`),
    },
    rowKind: "catalog",
  };
}

/** Wraps one placement in its exact frozen envelope. */
export function historicalPlacementEnvelope(
  row: HistoricalTryoutPlacement
): HistoricalTryoutPlacementEnvelope {
  const canonical = canonicalizeHistoricalTryoutPlacement(row);
  return {
    family: "tryout",
    record: {
      row,
      rowHash: hashText(`${PLACEMENT_DOMAIN}\n${canonical}`),
    },
    rowKind: "placement",
  };
}

/** Reconstructs one old aggregate digest from exact ordered records. */
function inventoryDigest<Row>(
  domain: string,
  records: readonly {
    readonly record: { readonly row: Row; readonly rowHash: string };
  }[],
  canonicalize: (row: Row) => string
) {
  const body = records
    .map(({ record }) => `${canonicalize(record.row)}\0${record.rowHash}\n`)
    .join("");
  return hashText(`${domain}\n${body}`);
}

/** Builds one authenticated test-only snapshot around exact old inventories. */
export function historicalTryoutInventory(
  catalog: readonly HistoricalTryoutCatalogEnvelope[],
  placements: readonly HistoricalTryoutPlacementEnvelope[],
  overrides: {
    readonly counts?: HistoricalTryoutSnapshot["counts"];
    readonly routeCount?: number;
  } = {}
) {
  const derivedCounts = {
    country: catalog.filter(({ record }) => record.row.kind === "country")
      .length,
    exam: catalog.filter(({ record }) => record.row.kind === "exam").length,
    section: catalog.filter(({ record }) => record.row.kind === "section")
      .length,
    set: catalog.filter(({ record }) => record.row.kind === "set").length,
    track: catalog.filter(({ record }) => record.row.kind === "track").length,
  };
  const routeCount = catalog.filter(
    ({ record }) =>
      "publicPath" in record.row && record.row.publicPath !== undefined
  ).length;
  const facts = {
    catalogDigest: inventoryDigest(
      CATALOG_DOMAIN,
      catalog,
      canonicalizeHistoricalTryoutCatalog
    ),
    counts: overrides.counts ?? derivedCounts,
    format: "tryout-v1" as const,
    locales: ["en", "id"] as const,
    placementCount: placements.length,
    placementDigest: inventoryDigest(
      PLACEMENT_DOMAIN,
      placements,
      canonicalizeHistoricalTryoutPlacement
    ),
    routeCount: overrides.routeCount ?? routeCount,
  };
  const snapshot = {
    ...facts,
    snapshotId: hashText(
      `${SNAPSHOT_DOMAIN}\n${canonicalizeHistoricalTryoutSnapshot(
        HistoricalTryoutSnapshotSchema.make({
          ...facts,
          snapshotId: HistoricalSha256HashSchema.make(
            `sha256:${"0".repeat(64)}`
          ),
        })
      )}`
    ),
  };
  return {
    catalog,
    expectedSnapshotId: snapshot.snapshotId,
    placements,
    snapshot,
  };
}

const retainedCatalog = Schema.decodeUnknownSync(
  HistoricalTryoutCatalogEnvelopeSchema
)(retainedTryoutCatalogRow, { onExcessProperty: "error" });
const retainedPlacement = Schema.decodeUnknownSync(
  HistoricalTryoutPlacementEnvelopeSchema
)(retainedTryoutPlacementRow, { onExcessProperty: "error" });
const retainedPlacementWithHash = Schema.decodeUnknownSync(
  HistoricalTryoutPlacementEnvelopeSchema
)(retainedTryoutPlacementWithHashRow, { onExcessProperty: "error" });

const retainedIndonesianCatalog = {
  ...retainedCatalog,
  record: {
    row: { ...retainedCatalog.record.row, locale: "id" as const },
    rowHash: HistoricalSha256HashSchema.make(
      "sha256:5b1670db716de6f8166bef24a96f0051f600a4f0b3496cc5085ecc8feadb9f09"
    ),
  },
};
const retainedIndonesianPlacement = {
  ...retainedPlacement,
  record: {
    row: {
      ...retainedPlacement.record.row,
      locale: "id" as const,
      title: "Soal 1",
    },
    rowHash: HistoricalSha256HashSchema.make(
      "sha256:f3eb4bf91d3761e28f14bf30e33c89004805030ecf21aa28431293a158c46187"
    ),
  },
};

/** Fixed old-vector fixture independent of the verifier implementation. */
export const retainedTryoutInventory = {
  catalog: [retainedCatalog, retainedIndonesianCatalog],
  expectedSnapshotId:
    "sha256:c4ebdcfdb8a7fc96d43ba4e75445c133f7b5db6c77247d65b93846666295dcc1",
  placements: [retainedPlacement, retainedIndonesianPlacement],
  snapshot: {
    catalogDigest:
      "sha256:740d1b98d27aaf4e7fc090f4ea2e1c4fdfd46315ca7e36df64bbf938829321d6",
    counts: { country: 2, exam: 0, section: 0, set: 0, track: 0 },
    format: "tryout-v1",
    locales: ["en", "id"],
    placementCount: 2,
    placementDigest:
      "sha256:b2124f1f8d70e5c62339a05a2d002c3bdcf01b6b50692e93eb8530fa70754749",
    routeCount: 2,
    snapshotId:
      "sha256:c4ebdcfdb8a7fc96d43ba4e75445c133f7b5db6c77247d65b93846666295dcc1",
  },
} as const;

/** Complete kind and route fixture for inventory closure coverage. */
export const completeHistoricalTryoutInventory = historicalTryoutInventory(
  historicalCatalogRows
    .concat(historicalInternalSection)
    .flatMap((row) => [row, { ...row, locale: "id" as const }])
    .map(historicalCatalogEnvelope)
    .sort((left, right) =>
      compareCodeUnits(
        catalogIdentity(left.record.row),
        catalogIdentity(right.record.row)
      )
    ),
  [
    historicalPlacementEnvelope(historicalPlacement),
    historicalPlacementEnvelope({ ...historicalPlacement, locale: "id" }),
  ].sort((left, right) =>
    compareCodeUnits(
      placementIdentity(left.record.row),
      placementIdentity(right.record.row)
    )
  )
);

/** Later retained placement shape whose content hash remains authenticated. */
export const contentHashHistoricalTryoutInventory = historicalTryoutInventory(
  [retainedCatalog],
  [retainedPlacementWithHash]
);
