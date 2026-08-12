import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { makeSnapshotTestData } from "#contracts/test/snapshot";
import {
  compareTryoutCatalog,
  compareTryoutPlacements,
  tryoutCatalogIdentity,
  tryoutPlacementIdentity,
} from "#contracts/tryout/identity";
import type { TryoutCatalogRow, TryoutPlacement } from "#contracts/tryout/spec";

describe("try-out identity", () => {
  it("orders catalog and placement identities deterministically", {
    timeout: 30_000,
  }, async () => {
    const snapshot = await Effect.runPromise(makeSnapshotTestData());
    const catalog: TryoutCatalogRow[] = [];
    const placements: TryoutPlacement[] = [];
    for (const row of snapshot.rows) {
      if (row.family !== "tryout") {
        continue;
      }
      if (row.rowKind === "catalog") {
        catalog.push(row.record.row);
      } else if (row.rowKind === "placement") {
        placements.push(row.record.row);
      }
    }
    const sortedCatalog = [...catalog].sort(compareTryoutCatalog);
    const sortedPlacements = [...placements].sort(compareTryoutPlacements);
    const [firstCatalog] = sortedCatalog;
    const [firstPlacement] = sortedPlacements;
    if (firstCatalog === undefined || firstPlacement === undefined) {
      throw new Error("Expected canonical try-out rows.");
    }

    expect(new Set(sortedCatalog.map(tryoutCatalogIdentity)).size).toBe(10);
    expect(new Set(sortedPlacements.map(tryoutPlacementIdentity)).size).toBe(2);
    expect(compareTryoutCatalog(firstCatalog, firstCatalog)).toBe(0);
    expect(compareTryoutPlacements(firstPlacement, firstPlacement)).toBe(0);
  });
});
