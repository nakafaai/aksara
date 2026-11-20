import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** The parts of the periodic table the table lab can focus on. */
const TABLE_FOCUSES = [
  "group-one",
  "period-three",
  "transition",
  "inner-transition",
  "metalloid",
  "noble-gas",
] as const;

/** The categories the table colors its elements by, and the marker of the lower series. */
const ELEMENT_CATEGORIES = [
  "metal",
  "transition-metal",
  "metalloid",
  "nonmetal",
  "noble-gas",
  "inner-transition",
  "series-marker",
] as const;

/** The two rows drawn below the table. */
const SERIES_ROWS = ["lanthanide", "actinide"] as const;

/** The trends the periodic properties lab compares. */
const PROPERTY_TRENDS = [
  "atomic-radius",
  "ionization-energy",
  "electron-affinity",
  "electronegativity",
] as const;

/** Props of `ModernPeriodicTableLab`: groups, periods, and blocks of the table. */
function modernPeriodicTableLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        atomicNumber: TextSchema,
        categoryNames: byIds(ELEMENT_CATEGORIES, TextSchema),
        chooseFocus: TextSchema,
        focuses: byIds(
          TABLE_FOCUSES,
          Schema.Struct({ detail: rich, name: TextSchema, tab: TextSchema })
        ),
        focusLabel: TextSchema,
        group: TextSchema,
        period: TextSchema,
        periodPrefix: TextSchema,
        seriesNames: byIds(SERIES_ROWS, TextSchema),
        tableLabel: TextSchema,
      }),
    }),
    answerAt(["labels", "focuses", "*", "detail"])
  );
}

/** Props of `PeriodicPropertiesLab`: how a property changes along a period and a group. */
function periodicPropertiesLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseTrend: TextSchema,
        factLabels: Schema.Struct({
          cause: TextSchema,
          group: TextSchema,
          period: TextSchema,
          question: TextSchema,
        }),
        modes: byIds(
          PROPERTY_TRENDS,
          Schema.Struct({
            cause: rich,
            groupTrend: rich,
            guidance: rich,
            name: TextSchema,
            periodTrend: rich,
            question: rich,
            tab: TextSchema,
          })
        ),
        sceneLabel: TextSchema,
      }),
    }),
    answerAt(
      ["labels", "modes", "*", "cause"],
      ["labels", "modes", "*", "groupTrend"],
      ["labels", "modes", "*", "periodTrend"]
    )
  );
}

/**
 * The periodic table labs. A focus detail explains what a part of the table
 * shares, and a trend and its cause state how a property changes and why, so
 * they are answer state.
 */
export function periodicVisuals<E>(rich: RichSlot<E>) {
  return {
    ModernPeriodicTableLab: modernPeriodicTableLab(rich),
    PeriodicPropertiesLab: periodicPropertiesLab(rich),
  };
}
