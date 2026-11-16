import { Schema } from "effect";

import {
  byIds,
  cardFields,
  type RichSlot,
  TextSchema,
} from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** Props of `MotionAreaLab`: a car drives a straight road through stretches of steady speeding up, steady speed and slowing down, and its velocity-time graph fills in below it. */
function motionAreaLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        displacement: rich,
        distance: rich,
        viewLabel: TextSchema,
      }),
      start: Schema.Finite,
      stretches: Schema.Array(
        Schema.Struct({ duration: Schema.Finite, end: Schema.Finite })
      ),
    })
  );
}

/** Props of `PendulumGraphLab`: a simple pendulum and its graph of T² against the measured length. */
function pendulumGraphLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      gradient: Schema.Finite,
      labels: Schema.Struct({
        gravity: rich,
        lengthIntercept: rich,
        measure: TextSchema,
        measures: byIds(["top", "centre"], rich),
        periodIntercept: rich,
        viewLabel: TextSchema,
      }),
      radius: Schema.Finite,
    })
  );
}

/** Props of `ReadingSpreadLab`: several students measure the same object, each with an own instrument, and their readings sit as dots on a magnified scale against the actual value. */
function readingSpreadLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      actual: Schema.Finite,
      labels: Schema.Struct({
        mean: rich,
        offset: rich,
        range: rich,
        student: TextSchema,
        viewLabel: TextSchema,
      }),
      students: Schema.Array(
        Schema.Struct({
          name: Schema.String,
          readings: Schema.NonEmptyArray(Schema.Finite),
        })
      ),
    })
  );
}

/**
 * The props of the measurement and graphs labs. Each prop is a value from the item the lab
 * draws, never the conclusion it leads to, so none holds answer state.
 */
export function readingVisuals<E>(rich: RichSlot<E>) {
  return {
    MotionAreaLab: motionAreaLab(rich),
    PendulumGraphLab: pendulumGraphLab(rich),
    ReadingSpreadLab: readingSpreadLab(rich),
  };
}
