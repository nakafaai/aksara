import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { makeSnapshotTestData } from "#contracts/test/snapshot";
import {
  compareTryoutCatalog,
  compareTryoutPlacements,
  tryoutCatalogIdentity,
  tryoutCatalogParentIdentity,
  tryoutCatalogRootIdentity,
  tryoutPlacementIdentity,
  tryoutPlacementParentIdentity,
} from "#contracts/tryout/identity";
import type { TryoutCatalogRow, TryoutPlacement } from "#contracts/tryout/spec";

/** Selects one exact hierarchy kind from authenticated test snapshot rows. */
function catalogRow(
  rows: readonly TryoutCatalogRow[],
  kind: TryoutCatalogRow["kind"]
) {
  const row = rows.find((candidate) => candidate.kind === kind);
  if (row === undefined) {
    throw new Error(`Expected one ${kind} catalog row.`);
  }
  return row;
}

describe("try-out identity", () => {
  it("derives every hierarchy parent from the same canonical identity", async () => {
    const snapshot = await Effect.runPromise(makeSnapshotTestData());
    const catalog = snapshot.rows.flatMap((row) =>
      row.family === "tryout" &&
      row.rowKind === "catalog" &&
      row.record.row.locale === "en"
        ? [row.record.row]
        : []
    );
    const placement = snapshot.rows.find(
      (row) =>
        row.family === "tryout" &&
        row.rowKind === "placement" &&
        row.record.row.locale === "en"
    );
    if (
      placement === undefined ||
      placement.family !== "tryout" ||
      placement.rowKind !== "placement"
    ) {
      throw new Error("Expected one English placement row.");
    }
    const country = catalogRow(catalog, "country");
    const exam = catalogRow(catalog, "exam");
    const track = catalogRow(catalog, "track");
    const set = catalogRow(catalog, "set");
    const section = catalogRow(catalog, "section");

    expect(tryoutCatalogParentIdentity(country)).toBe(
      tryoutCatalogRootIdentity("en")
    );
    expect(tryoutCatalogParentIdentity(exam)).toBe(
      tryoutCatalogIdentity(country)
    );
    expect(tryoutCatalogParentIdentity(track)).toBe(
      tryoutCatalogIdentity(exam)
    );
    expect(tryoutCatalogParentIdentity(set)).toBe(tryoutCatalogIdentity(track));
    expect(tryoutCatalogParentIdentity(section)).toBe(
      tryoutCatalogIdentity(set)
    );
    expect(tryoutPlacementParentIdentity(placement.record.row)).toBe(
      tryoutCatalogIdentity(section)
    );
  });

  it("orders catalog and placement identities deterministically", async () => {
    const snapshot = await Effect.runPromise(makeSnapshotTestData());
    const catalog: TryoutCatalogRow[] = [];
    const placements: TryoutPlacement[] = [];
    for (const row of snapshot.rows) {
      if (row.family !== "tryout") {
        continue;
      }
      if (row.rowKind === "catalog") {
        catalog.push(row.record.row);
      } else {
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
