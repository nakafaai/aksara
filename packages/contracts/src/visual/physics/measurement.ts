import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** The quantities the dimension lab builds from length. */
const DIMENSION_MODES = ["length", "area", "volume"] as const;

/** The instruments the measurement lab reads. */
const MEASUREMENT_TOOLS = ["length", "mass", "time"] as const;

/** Props of `DimensionLab`: length, area, and volume and their dimensions. */
function dimensionLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseMode: TextSchema,
        dimension: TextSchema,
        formula: TextSchema,
        modes: byIds(DIMENSION_MODES, TextSchema),
        unit: TextSchema,
      }),
    })
  );
}

/** Props of `MeasurementToolsLab`: reading a ruler, a balance, and a stopwatch. */
function measurementToolsLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseTool: TextSchema,
        decimalSeparator: Schema.Literals([".", ","]),
        instrument: TextSchema,
        measuredObject: TextSchema,
        reading: TextSchema,
        tools: byIds(
          MEASUREMENT_TOOLS,
          Schema.Struct({
            control: TextSchema,
            instrument: TextSchema,
            object: TextSchema,
            tab: TextSchema,
          })
        ),
      }),
    })
  );
}

/** Props of `VectorConceptLab`: the tension of two cables as vectors. */
function vectorConceptLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        bridgeView: TextSchema,
        chooseLoadPosition: TextSchema,
        direction: TextSchema,
        directionValue: TextSchema,
        leftCable: rich,
        magnitude: TextSchema,
        magnitudeValue: TextSchema,
        netIdea: TextSchema,
        netIdeaValue: TextSchema,
        rightCable: rich,
      }),
    }),
    answerAt(["labels", "netIdeaValue"])
  );
}

/** Props of `WindEnergyConversionLab`: wind turned into electric energy. */
function windEnergyLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        flow: rich,
        flowLabel: TextSchema,
        meaning: rich,
        meaningLabel: TextSchema,
        speedControl: TextSchema,
        speedUnit: TextSchema,
        viewLabel: TextSchema,
      }),
    }),
    answerAt(["labels", "meaning"])
  );
}

/**
 * The measurement, vector, and energy labs. The net idea of the cable lab and
 * the meaning of the wind lab state the conclusion each lab leads to, so they
 * are answer state.
 */
export function measurementVisuals<E>(rich: RichSlot<E>) {
  return {
    DimensionLab: dimensionLab(rich),
    MeasurementToolsLab: measurementToolsLab(rich),
    VectorConceptLab: vectorConceptLab(rich),
    WindEnergyConversionLab: windEnergyLab(rich),
  };
}
