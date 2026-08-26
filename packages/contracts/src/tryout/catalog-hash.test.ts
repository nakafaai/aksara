import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Stream } from "effect";

import { makeTryoutTestRows } from "#contracts/test/tryout";
import type { TryoutCatalogRow } from "#contracts/tryout/catalog";
import {
  canonicalizeTryoutCatalog,
  compareTryoutCatalog,
  digestTryoutCatalog,
  makeTryoutCatalogRecord,
} from "#contracts/tryout/catalog-hash";

const rows: readonly TryoutCatalogRow[] = makeTryoutTestRows().catalog.map(
  ({ row }) => row
);

describe("try-out catalog identity and hashing", () => {
  it.effect("canonicalizes and digests signed catalog rows", () =>
    Effect.gen(function* () {
      const records = rows.map(makeTryoutCatalogRecord);
      records.sort((left, right) => compareTryoutCatalog(left.row, right.row));
      const first = yield* Effect.fromNullishOr(rows[0]);
      const summary = yield* digestTryoutCatalog(Stream.fromIterable(records));

      expect(JSON.parse(canonicalizeTryoutCatalog(first))).toEqual(first);
      expect(summary.count).toBe(records.length);
    })
  );
});
