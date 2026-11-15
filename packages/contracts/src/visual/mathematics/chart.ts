import { Array as Arr, Schema } from "effect";

import { hasDistinctIds } from "#contracts/assessment/identity";
import { cardFields, type RichSlot, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/**
 * One series of a chart: its name, whether it is drawn as bars or as a line,
 * and one value for each category. A value is null where the series has no
 * value for that category, as a line of yearly growth that bars mark only in
 * some years.
 */
const ChartSeriesSchema = Schema.Struct({
  label: TextSchema,
  mark: Schema.Literals(["bar", "line"]),
  values: Schema.NonEmptyArray(Schema.NullOr(Schema.Finite)),
});

/** The part of the value axis that a chart shows, from its minimum to its maximum. */
const ValueRangeSchema = Schema.Struct({
  max: Schema.Finite,
  min: Schema.Finite,
}).check(
  Schema.makeFilter(({ max, min }) => min < max, {
    message: "Expected a value range whose minimum is below its maximum.",
  })
);

/** The data a chart relates: its bar placement, its categories, and its series. */
const ChartDataSchema = Schema.Struct({
  /**
   * How the bars of a chart that has bars stand: `apart` leaves a gap between
   * neighboring categories, as a bar chart does, and `touching` closes it, as
   * a histogram of classes does. A chart of lines alone has no bars to place.
   */
  bars: Schema.optionalKey(Schema.Literals(["apart", "touching"])),
  categories: Schema.NonEmptyArray(TextSchema),
  series: Schema.NonEmptyArray(ChartSeriesSchema),
});
type ChartData = typeof ChartDataSchema.Type;

/** The fields of a chart, before the checks that relate them. */
function chartFields<E>(rich: RichSlot<E>) {
  return Schema.Struct({
    ...cardFields(rich),
    ...ChartDataSchema.fields,
    valueLabel: Schema.optionalKey(TextSchema),
    valueRange: Schema.optionalKey(ValueRangeSchema),
  });
}

/** Checks that every series has one value for each category, and at least one that is not null. */
function hasValuePerCategory(chart: ChartData) {
  return Arr.every(
    chart.series,
    ({ values }) =>
      values.length === chart.categories.length &&
      Arr.some(values, (value) => value !== null)
  );
}

/** Checks that no two series share a name, so a legend tells them apart in words. */
function hasDistinctSeries(chart: ChartData) {
  return hasDistinctIds(Arr.map(chart.series, ({ label }) => label));
}

/** Checks that a chart says how its bars stand exactly when it has bars. */
function hasBarPlacement(chart: ChartData) {
  const hasBars = Arr.some(chart.series, ({ mark }) => mark === "bar");
  return hasBars === (chart.bars !== undefined);
}

/**
 * Props of `Chart`: categories along one axis and one or more series of
 * values drawn as bars or lines over them, the data of a bar chart, a line
 * chart, a histogram, or both marks at once. The data is the figure, so a
 * learner reads the same values that the figure draws. Every series has a
 * name, because no meaning may ride on color alone.
 */
export function chartProps<E>(rich: RichSlot<E>) {
  return figure(
    chartFields(rich).check(
      Schema.makeFilter(hasValuePerCategory, {
        message:
          "Expected each series to have one value for each category, and at least one value.",
      }),
      Schema.makeFilter(hasDistinctSeries, {
        message: "Expected each series to have a name of its own.",
      }),
      Schema.makeFilter(hasBarPlacement, {
        message:
          "Expected a bar placement on a chart with bars, and on no other.",
      })
    )
  );
}
