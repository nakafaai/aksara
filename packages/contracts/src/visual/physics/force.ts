import { Schema } from "effect";

import { cardFields, type RichSlot, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** Props of `ForceTableResultantLab`: a force table on a lab bench. */
function forceTableResultantLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        angle: rich,
        angleName: TextSchema,
        direction: rich,
        resultant: rich,
        sumX: rich,
        sumY: rich,
        viewLabel: TextSchema,
      }),
      pulls: Schema.Array(
        Schema.Struct({
          angle: Schema.Finite,
          mass: Schema.Finite.check(Schema.isGreaterThan(0)),
        })
      ),
    })
  );
}

/** Props of `TugOfWarForceLab`: a tug of war at sunset. */
function tugOfWarForceLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        left: rich,
        leftCount: rich,
        leftName: TextSchema,
        net: rich,
        right: rich,
        rightCount: rich,
        rightName: TextSchema,
        viewLabel: TextSchema,
      }),
      left: Schema.Finite,
      pull: Schema.Finite,
      right: Schema.Finite,
    })
  );
}

/**
 * Props of `TugboatResultantLab`: two harbour tugs tow a bulk carrier, their
 * cables opening at an angle.
 */
function tugboatResultantLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      between: Schema.Finite,
      first: Schema.Finite,
      labels: Schema.Struct({
        between: rich,
        betweenName: TextSchema,
        fromFirst: rich,
        fromLine: rich,
        resultant: rich,
        viewLabel: TextSchema,
      }),
      second: Schema.Finite,
    })
  );
}

/**
 * Props of `RampBlockComponentLab`: a wooden block on a pine plank hinged on a
 * lab bench.
 */
function rampBlockComponentLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      angle: Schema.Finite,
      distance: Schema.optionalKey(Schema.Finite),
      friction: Schema.Finite,
      labels: Schema.Struct({
        along: rich,
        angle: rich,
        angleName: TextSchema,
        into: rich,
        viewLabel: TextSchema,
        weight: rich,
        work: Schema.optionalKey(rich),
      }),
      mass: Schema.Finite,
    })
  );
}

/**
 * Props of `KiteStringTensionLab`: a kite on a string tied to a stake, the wind
 * carrying it downwind.
 */
function kiteStringTensionLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      angle: Schema.Finite,
      labels: Schema.Struct({
        across: rich,
        angle: rich,
        angleName: TextSchema,
        up: rich,
        viewLabel: TextSchema,
      }),
      length: Schema.Finite,
      tension: Schema.Finite,
    })
  );
}

/**
 * The props of the labs that add and resolve forces. No prop states the
 * conclusion a lab leads to, so none holds answer state.
 */
export function forceVisuals<E>(rich: RichSlot<E>) {
  return {
    ForceTableResultantLab: forceTableResultantLab(rich),
    TugOfWarForceLab: tugOfWarForceLab(rich),
    TugboatResultantLab: tugboatResultantLab(rich),
    RampBlockComponentLab: rampBlockComponentLab(rich),
    KiteStringTensionLab: kiteStringTensionLab(rich),
  };
}
