import { describe, expect, it } from "vitest";

import { getTableChairArrangement } from "#corpus/material/lesson/mathematics/sequence-series/sequence-concept/animation-table/arrangement";

describe("table chair arrangement", () => {
  it("places four chairs around one table", () => {
    expect(getTableChairArrangement(1)).toEqual({
      chairSize: 24,
      chairs: [
        { id: 1, side: "left", x: -32, y: 28 },
        { id: 2, side: "right", x: 108, y: 28 },
        { id: 3, side: "top", x: 38, y: -32 },
        { id: 4, side: "bottom", x: 38, y: 88 },
      ],
      height: 80,
      tables: [{ height: 80, id: 1, width: 100, x: 0, y: 0 }],
      width: 100,
    });
  });

  it("adds one top and bottom chair for every joined table", () => {
    const arrangement = getTableChairArrangement(3);

    expect(arrangement.width).toBe(308);
    expect(arrangement.tables).toEqual([
      { height: 80, id: 1, width: 100, x: 0, y: 0 },
      { height: 80, id: 2, width: 100, x: 104, y: 0 },
      { height: 80, id: 3, width: 100, x: 208, y: 0 },
    ]);
    expect(arrangement.chairs).toHaveLength(8);
    expect(arrangement.chairs.at(-1)).toEqual({
      id: 8,
      side: "bottom",
      x: 246,
      y: 88,
    });
  });
});
