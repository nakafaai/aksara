import { describe, expect, it } from "@effect/vitest";
import { Schema } from "effect";

import { makeTryoutTestRows } from "#contracts/test/tryout";
import { TryoutCatalogNodeIdentitySchema } from "#contracts/tryout/catalog";
import {
  compareTryoutPlacements,
  tryoutCatalogIdentity,
  tryoutCatalogNodeIdentity,
  tryoutPlacementIdentity,
  tryoutPlacementLogicalIdentity,
} from "#contracts/tryout/identity";

describe("try-out placement identity", () => {
  it("derives complete-row identities from the minimal semantic contract", () => {
    const rows = makeTryoutTestRows().catalog.map(({ row }) => row);
    const identities = rows.map((row) => {
      const identity = Schema.decodeSync(TryoutCatalogNodeIdentitySchema)(row, {
        onExcessProperty: "ignore",
      });
      return [tryoutCatalogNodeIdentity(identity), tryoutCatalogIdentity(row)];
    });

    expect(
      identities.every(([minimal, complete]) => minimal === complete)
    ).toBe(true);
  });

  it("keeps catalog kinds and application locales distinct", () => {
    const country = Schema.decodeSync(TryoutCatalogNodeIdentitySchema)({
      appLocale: "en",
      countryKey: "indonesia",
      kind: "country",
    });
    const exam = Schema.decodeSync(TryoutCatalogNodeIdentitySchema)({
      appLocale: "en",
      countryKey: "indonesia",
      examKey: "snbt",
      kind: "exam",
    });
    const german = Schema.decodeSync(TryoutCatalogNodeIdentitySchema)({
      ...country,
      appLocale: "de",
    });

    expect(tryoutCatalogNodeIdentity(country)).not.toBe(
      tryoutCatalogNodeIdentity(exam)
    );
    expect(tryoutCatalogNodeIdentity(country)).not.toBe(
      tryoutCatalogNodeIdentity(german)
    );
  });

  it("orders application-localized placements deterministically", () => {
    const placements = makeTryoutTestRows().placements.map(({ row }) => row);
    const sorted = [...placements].sort(compareTryoutPlacements);
    const [first] = sorted;

    expect(first).toBeDefined();
    expect(new Set(sorted.map(tryoutPlacementIdentity)).size).toBe(3);
    expect(new Set(sorted.map(tryoutPlacementLogicalIdentity)).size).toBe(1);
    if (first !== undefined) {
      expect(compareTryoutPlacements(first, first)).toBe(0);
    }
  });
});
