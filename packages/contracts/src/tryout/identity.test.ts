import { describe, expect, it } from "vitest";

import { makeTryoutTestRows } from "#contracts/test/tryout";
import {
  compareTryoutPlacements,
  tryoutPlacementIdentity,
  tryoutPlacementLogicalIdentity,
} from "#contracts/tryout/identity";

describe("try-out placement identity", () => {
  it("orders application-localized placements deterministically", () => {
    const placements = makeTryoutTestRows().placements.map(({ row }) => row);
    const sorted = [...placements].sort(compareTryoutPlacements);
    const [first] = sorted;

    expect(first).toBeDefined();
    expect(new Set(sorted.map(tryoutPlacementIdentity)).size).toBe(2);
    expect(new Set(sorted.map(tryoutPlacementLogicalIdentity)).size).toBe(1);
    if (first !== undefined) {
      expect(compareTryoutPlacements(first, first)).toBe(0);
    }
  });
});
