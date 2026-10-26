import { describe, expect, it } from "@effect/vitest";

import { ChartPropsSchema } from "#contracts/assessment/chart";
import {
  decodeStrict,
  failsStrict,
  math,
  text,
} from "#contracts/test/assessment/document";

const histogram = {
  bars: "touching",
  categories: ["30s", "40s", "50s"],
  description: [text("Days by visitors in "), math("10"), text(" classes.")],
  series: [{ label: "Days", mark: "bar", values: [3, 5, 6] }],
  title: [text("Visitors")],
  valueLabel: "Days",
};

const growth = {
  categories: ["2013", "2014", "2015"],
  description: [text("Yearly growth.")],
  series: [{ label: "Growth", mark: "line", values: [5.56, null, 4.88] }],
  title: [text("Growth")],
  valueRange: { max: 6, min: 4 },
};

describe("chart props", () => {
  it("decodes the data of a histogram and of a line with a gap", () => {
    expect(decodeStrict(ChartPropsSchema, histogram)).toEqual(histogram);
    expect(decodeStrict(ChartPropsSchema, growth)).toEqual(growth);
  });

  it("requires one value for each category and at least one value", () => {
    for (const values of [
      [3, 5],
      [null, null, null],
    ]) {
      expect(
        failsStrict(ChartPropsSchema, {
          ...histogram,
          series: [{ ...histogram.series[0], values }],
        })
      ).toBe(true);
    }
  });

  it("requires series with names of their own", () => {
    expect(
      failsStrict(ChartPropsSchema, {
        ...histogram,
        series: [histogram.series[0], histogram.series[0]],
      })
    ).toBe(true);
  });

  it("places bars exactly when the chart has bars", () => {
    const { bars: _bars, ...withoutPlacement } = histogram;

    expect(failsStrict(ChartPropsSchema, withoutPlacement)).toBe(true);
    expect(failsStrict(ChartPropsSchema, { ...growth, bars: "apart" })).toBe(
      true
    );
  });

  it("requires a value range that runs upward", () => {
    expect(
      failsStrict(ChartPropsSchema, {
        ...growth,
        valueRange: { max: 4, min: 6 },
      })
    ).toBe(true);
  });
});
