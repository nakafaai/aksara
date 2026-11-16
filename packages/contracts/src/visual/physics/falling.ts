import { Schema } from "effect";

import {
  byIds,
  cardFields,
  type RichSlot,
  TextSchema,
} from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** Props of `GalileoInclineBellsLab`: Galileo's inclined plane. */
function galileoInclineBellsLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        acceleration: rich,
        chooseAngle: TextSchema,
        firstSecond: rich,
        gaps: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * Props of `FeatherCoinVacuumLab`: a coin and a feather let go together inside
 * a tall glass tube.
 */
function featherCoinVacuumLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        airs: byIds(["air", "vacuum"], rich),
        chooseAir: TextSchema,
        coinTime: rich,
        drop: rich,
        featherTime: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/** Props of `FallingTargetAimLab`: the falling-target demonstration. */
function fallingTargetAimLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        drop: rich,
        meetTime: rich,
        speed: rich,
        speedName: TextSchema,
        viewLabel: TextSchema,
      }),
      speed: Schema.optionalKey(Schema.Finite),
    })
  );
}

/**
 * Props of `HoseJetProjectileLab`: a garden hose held at the ground and tilted
 * to six angles.
 */
function hoseJetProjectileLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      angle: Schema.optionalKey(Schema.Literals([15, 30, 45, 60, 75, 90])),
      labels: Schema.Struct({
        chooseAngle: TextSchema,
        flight: rich,
        range: rich,
        top: rich,
        viewLabel: TextSchema,
      }),
      speed: Schema.Finite,
    })
  );
}

/**
 * The props of the falling and projectile labs. No prop states the conclusion a
 * lab leads to, so none holds answer state.
 */
export function fallingVisuals<E>(rich: RichSlot<E>) {
  return {
    GalileoInclineBellsLab: galileoInclineBellsLab(rich),
    FeatherCoinVacuumLab: featherCoinVacuumLab(rich),
    FallingTargetAimLab: fallingTargetAimLab(rich),
    HoseJetProjectileLab: hoseJetProjectileLab(rich),
  };
}
