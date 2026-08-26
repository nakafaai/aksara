import { describe, expect, it } from "@effect/vitest";
import { MAX_TRYOUT_HISTORY_MIGRATION_ROWS } from "@nakafa/aksara-contracts/transport/migration/tryout/request";
import { Effect } from "effect";

import { hasBoundMigration } from "#publisher/target/evidence/migration";
import { migrationProtocol, migrationResponse } from "#test/migration/protocol";
import {
  historicalCatalogEntries,
  historicalPlacementEntries,
} from "#test/migration/rows";
import { migrationId } from "#test/migration/source";

describe("migration row cursor evidence", () => {
  it.effect("binds ordered cursors and every terminal page shape", () =>
    Effect.gen(function* () {
      const exchanges = yield* migrationProtocol();
      const first = historicalCatalogEntries.at(0);
      const placement = historicalPlacementEntries.at(0);
      if (first === undefined || placement === undefined) {
        return yield* Effect.die("Expected retained row fixtures.");
      }
      const full = Array.from(
        { length: MAX_TRYOUT_HISTORY_MIGRATION_ROWS },
        (_, index) => ({ ...first, index })
      );
      const validPage = migrationResponse({
        command: "rowPage",
        isDone: false,
        migrationId,
        nextIndex: MAX_TRYOUT_HISTORY_MIGRATION_ROWS - 1,
        rowKind: "catalog",
        rows: full,
      });
      const invalidPages = [
        migrationResponse({
          command: "rowPage",
          isDone: true,
          migrationId,
          nextIndex: null,
          rowKind: "placement",
          rows: historicalPlacementEntries,
        }),
        migrationResponse({
          command: "rowPage",
          isDone: true,
          migrationId,
          nextIndex: null,
          rowKind: "catalog",
          rows: [...full, { ...first, index: full.length }],
        }),
        migrationResponse({
          command: "rowPage",
          isDone: true,
          migrationId,
          nextIndex: null,
          rowKind: "catalog",
          rows: [first, { ...first, index: 2 }],
        }),
        migrationResponse({
          command: "rowPage",
          isDone: true,
          migrationId,
          nextIndex: null,
          rowKind: "catalog",
          rows: [placement],
        }),
        migrationResponse({
          command: "rowPage",
          isDone: true,
          migrationId,
          nextIndex: 0,
          rowKind: "catalog",
          rows: [first],
        }),
        migrationResponse({
          command: "rowPage",
          isDone: false,
          migrationId,
          nextIndex: 0,
          rowKind: "catalog",
          rows: [first],
        }),
        migrationResponse({
          command: "rowPage",
          isDone: false,
          migrationId,
          nextIndex: MAX_TRYOUT_HISTORY_MIGRATION_ROWS - 2,
          rowKind: "catalog",
          rows: full,
        }),
      ];

      expect(hasBoundMigration(exchanges.row.request, validPage)).toBe(true);
      expect(
        invalidPages.map((page) =>
          hasBoundMigration(exchanges.row.request, page)
        )
      ).toEqual(Array.from({ length: invalidPages.length }, () => false));
    })
  );
});
