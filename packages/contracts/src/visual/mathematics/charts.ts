import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { cardFields, TextSchema } from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";
import { chartProps } from "#contracts/visual/mathematics/chart";

/** How a chart marks a point of a line or a scatter. */
const DotSchema = Schema.Literals([
  "default",
  "border",
  "colored-border",
  "square",
  "square-border",
  "diamond",
  "diamond-border",
  "triangle",
  "triangle-border",
]);

/** The cue that tells one series apart without its color: a line, points, or bars. */
const SeriesCueSchema = Schema.Union([
  Schema.Struct({
    activeDot: DotSchema,
    dot: DotSchema,
    kind: Schema.Literal("line"),
    strokeDasharray: Schema.optionalKey(TextSchema),
  }),
  Schema.Struct({
    activeDot: DotSchema,
    dot: DotSchema,
    kind: Schema.Literal("point"),
  }),
  Schema.Struct({
    kind: Schema.Literal("bar"),
    radius: Schema.Finite,
    variant: Schema.Literals(["default", "hatched"]),
  }),
]);

/** The colors of one series in a light and a dark theme; at least one theme is set. */
const ThemeColorsSchema = Schema.Union([
  Schema.Struct({
    dark: Schema.optionalKey(Schema.Array(TextSchema)),
    light: Schema.Array(TextSchema),
  }),
  Schema.Struct({ dark: Schema.Array(TextSchema) }),
]);

/** Props of `BarChart` and `HistogramChart`: one value for each named bar. */
function barChart<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      chartConfig: Schema.Record(
        TextSchema,
        Schema.Struct({
          colors: Schema.optionalKey(ThemeColorsSchema),
          cue: Schema.optionalKey(SeriesCueSchema),
          label: Schema.optionalKey(rich),
        })
      ),
      data: Schema.Array(
        Schema.Struct({ name: TextSchema, value: Schema.Finite })
      ),
      yAxisLabel: TextSchema,
    })
  );
}

/** Props of `ScatterDiagram`: named series of points, with an optional regression. */
function scatterDiagram<E>(rich: RichSlot<E>) {
  return Schema.Struct({
    ...cardFields(rich),
    calculateRegressionLine: Schema.optionalKey(Schema.Boolean),
    datasets: Schema.Array(
      Schema.Struct({
        color: TextSchema,
        name: TextSchema,
        points: Schema.Array(
          Schema.Struct({ x: Schema.Finite, y: Schema.Finite })
        ),
      })
    ),
    regressionLineStyle: Schema.optionalKey(
      Schema.Struct({
        color: Schema.optionalKey(TextSchema),
        strokeDasharray: Schema.optionalKey(TextSchema),
      })
    ),
    showResiduals: Schema.optionalKey(Schema.Boolean),
    xAxisDomain: Schema.optionalKey(Schema.Literal("min-max")),
    xAxisLabel: Schema.optionalKey(TextSchema),
    yAxisLabel: Schema.optionalKey(TextSchema),
  });
}

/** Props of `FunctionChart`: the exponential model `p · aˣ` and its table. */
function functionChart<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      a: Schema.Finite.check(Schema.isGreaterThan(0)),
      mode: Schema.optionalKey(Schema.Literals(["continuous", "discrete"])),
      n: Schema.optionalKey(Schema.Int.check(Schema.isGreaterThanOrEqualTo(2))),
      p: Schema.Finite,
    })
  );
}

/**
 * The charts of data and functions. A regression line and its residuals are
 * the result of fitting the points, so they are answer state; the data a chart
 * draws is the question itself.
 */
export function chartVisuals<E>(rich: RichSlot<E>) {
  return {
    BarChart: barChart(rich),
    Chart: chartProps(rich),
    FunctionChart: functionChart(rich),
    HistogramChart: barChart(rich),
    ScatterDiagram: figure(
      scatterDiagram(rich),
      answerAt(["calculateRegressionLine"], ["showResiduals"])
    ),
  };
}
