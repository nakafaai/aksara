import { Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";

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
  it("canonicalizes and digests signed catalog rows", async () => {
    const records = rows.map(makeTryoutCatalogRecord);
    records.sort((left, right) => compareTryoutCatalog(left.row, right.row));
    const [first] = rows;
    if (!first) {
      throw new Error("Expected at least one current catalog test row.");
    }
    const summary = await Effect.runPromise(
      digestTryoutCatalog(Stream.fromIterable(records))
    );

    expect(JSON.parse(canonicalizeTryoutCatalog(first))).toEqual(first);
    expect(summary.count).toBe(records.length);
  });
});
