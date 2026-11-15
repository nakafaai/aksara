import { describe, expect, it } from "@effect/vitest";

import { failsStrict } from "#contracts/test/assessment/document";
import { numberLineProps } from "#contracts/test/assessment/figure";
import { assessmentVisuals } from "#contracts/visual/catalog";

const NumberLineSchema = assessmentVisuals.NumberLine.props;

describe("NumberLine props", () => {
  const [first, second] = numberLineProps.segments;

  it("draws a segment without a start or an end as a ray, as the renderer does", () => {
    expect(failsStrict(NumberLineSchema, numberLineProps)).toBe(false);
    for (const start of [Number.NEGATIVE_INFINITY, "-infinity"]) {
      expect(
        failsStrict(NumberLineSchema, {
          ...numberLineProps,
          segments: [{ ...first, start }],
        })
      ).toBe(true);
    }
  });

  it("keeps a segment and the visible range running upward", () => {
    expect(
      failsStrict(NumberLineSchema, {
        ...numberLineProps,
        segments: [{ ...second, end: -4, start: 7 }],
      })
    ).toBe(true);
    expect(
      failsStrict(NumberLineSchema, {
        ...numberLineProps,
        segments: [{ ...second, end: 7, start: 7 }],
      })
    ).toBe(false);
    expect(
      failsStrict(NumberLineSchema, { ...numberLineProps, max: -5, min: 9 })
    ).toBe(true);
    const { max: _max, min: _min, ...withoutRange } = numberLineProps;

    expect(failsStrict(NumberLineSchema, withoutRange)).toBe(false);
  });

  it("allows a background of transparent only, because color carries no meaning", () => {
    expect(
      failsStrict(NumberLineSchema, {
        ...numberLineProps,
        segments: [{ ...second, backgroundColor: "#ff0000" }],
      })
    ).toBe(true);
  });
});
