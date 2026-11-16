import { Schema } from "effect";

import {
  byIds,
  cardFields,
  type RichSlot,
  TextSchema,
} from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/**
 * Props of `BrakeHeatLab`: a front wheel seen up close while the car brakes to
 * rest.
 */
function brakeHeatLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseSpeed: TextSchema,
        discTemperature: rich,
        kineticEnergy: rich,
        temperatureRise: rich,
        thermal: TextSchema,
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * Props of `BrakingSurfaceLab`: a car at 20 m/s locks its wheels at the white
 * line on the road surface the learner picks.
 */
function brakingSurfaceLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        brakingDistance: rich,
        brakingTime: rich,
        chooseSurface: TextSchema,
        deceleration: rich,
        friction: rich,
        surfaces: byIds(["dry", "wet", "gravel", "snow", "ice"], TextSchema),
        viewLabel: TextSchema,
      }),
    })
  );
}

/** Props of `FollowingDistanceLab`: two cars at 90 km/h on one lane. */
function followingDistanceLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseHeadway: TextSchema,
        crash: rich,
        finalGap: rich,
        impactSpeed: rich,
        initialGap: rich,
        reactionDistance: rich,
        reactionTime: TextSchema,
        safe: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/** Props of `ReactionTimeLab`: a reaction test from the driver's seat. */
function reactionTimeLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        average: rich,
        best: rich,
        brake: TextSchema,
        early: rich,
        lastTime: rich,
        reactionDistance: rich,
        start: TextSchema,
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * The props of the braking and stopping labs. No prop states the conclusion a
 * lab leads to, so none holds answer state.
 */
export function brakingVisuals<E>(rich: RichSlot<E>) {
  return {
    BrakeHeatLab: brakeHeatLab(rich),
    BrakingSurfaceLab: brakingSurfaceLab(rich),
    FollowingDistanceLab: followingDistanceLab(rich),
    ReactionTimeLab: reactionTimeLab(rich),
  };
}
