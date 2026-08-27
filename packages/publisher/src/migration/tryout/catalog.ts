import type { StoredTryoutCatalogRow } from "@nakafa/aksara-contracts/history/decode";
import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { hasLosslessHistoricalCatalogMapping } from "@nakafa/aksara-contracts/migration/tryout/history/lossless";
import type { TryoutHistoryMigrationRowMapping } from "@nakafa/aksara-contracts/transport/migration/tryout/request";
import {
  type TryoutCatalogRecord,
  TryoutCatalogRowSchema,
} from "@nakafa/aksara-contracts/tryout/catalog";
import { makeTryoutCatalogRecord } from "@nakafa/aksara-contracts/tryout/catalog-hash";
import { Effect, Schema } from "effect";

import { migrationFail } from "#publisher/migration/tryout/error";
import type { IndexedHistoricalRow } from "#publisher/migration/tryout/source";

/** One current catalog record bound to its retained global identity. */
export type ConvertedCatalogMapping = Extract<
  TryoutHistoryMigrationRowMapping,
  { readonly rowKind: "catalog" }
>;

/** Converts locale naming without changing any catalog semantics. */
const convertCatalogRow = Effect.fn("AksaraPublisher.convertTryoutCatalogRow")(
  function* (source: StoredTryoutCatalogRow["record"]["row"]) {
    const { locale, ...historical } = source;
    const row = yield* Schema.decodeEffect(TryoutCatalogRowSchema)(
      { ...historical, appLocale: AppLocaleSchema.make(locale) },
      { onExcessProperty: "error" }
    ).pipe(Effect.mapError(() => migrationFail("catalog-conversion")));
    if (!hasLosslessHistoricalCatalogMapping(source, row)) {
      return yield* migrationFail("catalog-conversion");
    }
    return makeTryoutCatalogRecord(row);
  }
);

/** Converts all catalog rows while preserving their retained global indices. */
export const convertTryoutCatalog = Effect.fn(
  "AksaraPublisher.convertTryoutCatalog"
)((catalog: readonly IndexedHistoricalRow<StoredTryoutCatalogRow>[]) =>
  Effect.forEach(catalog, ({ index, row }) =>
    convertCatalogRow(row.record.row).pipe(
      Effect.map(
        (record): ConvertedCatalogMapping => ({
          index,
          oldRowHash: row.record.rowHash,
          record,
          rowKind: "catalog",
        })
      )
    )
  )
);

/** Projects current catalog records for deterministic target computation. */
export function convertedCatalogRecords(
  rows: readonly ConvertedCatalogMapping[]
): readonly TryoutCatalogRecord[] {
  return rows.map(({ record }) => record);
}
