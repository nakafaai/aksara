import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import {
  byIds,
  cardFields,
  DecimalSeparatorSchema,
  TextSchema,
} from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** The rocket motions the acceleration visuals compare. */
const ACCELERATION_CASES = ["speed-up", "steady", "slow-down"] as const;

/** The train motions of uniformly accelerated motion. */
const ACCELERATED_SCENARIOS = ["from-rest", "speed-up", "brake"] as const;

/** Props of `AccelerationGraphCard`: the velocity-time graph of three rocket motions. */
function accelerationGraphCard<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseCase: TextSchema,
        contextLine: TextSchema,
        scenarioNames: byIds(ACCELERATION_CASES, TextSchema),
        timeAxis: TextSchema,
        velocityAxis: TextSchema,
      }),
    })
  );
}

/** Props of `AccelerationLab`: a rocket passing gates once every second. */
function accelerationLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseCase: TextSchema,
        factLabels: Schema.Struct({
          acceleration: rich,
          finalVelocity: rich,
          initialVelocity: rich,
          timeStep: rich,
        }),
        scenarioNames: byIds(ACCELERATION_CASES, rich),
        viewLabel: TextSchema,
      }),
    })
  );
}

/** Props of `NonUniformLinearMotionGraphCard`: the velocity-time graph of a train. */
function acceleratedGraphCard<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseScenario: TextSchema,
        scenarioNames: byIds(ACCELERATED_SCENARIOS, TextSchema),
        timeAxis: TextSchema,
        velocityAxis: TextSchema,
      }),
    })
  );
}

/** Props of `NonUniformLinearMotionLab`: a train that speeds up or brakes evenly. */
function acceleratedLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseScenario: TextSchema,
        factLabels: Schema.Struct({
          acceleration: rich,
          displacement: rich,
          finalVelocity: rich,
          initialVelocity: rich,
        }),
        scenarioNames: byIds(ACCELERATED_SCENARIOS, rich),
        viewLabel: TextSchema,
      }),
    })
  );
}

/** Props of `UniformLinearMotionLab`: equal steps in equal times. */
function uniformLinearLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseSpeed: TextSchema,
        duration: rich,
        positionStep: rich,
        speed: rich,
        stepDistance: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/** Props of `UniformCircularMotionLab`: a body on a circle at a steady period. */
function uniformCircularLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      decimalSeparator: Schema.optionalKey(DecimalSeparatorSchema),
      labels: Schema.Struct({
        acceleration: rich,
        choosePeriod: TextSchema,
        period: rich,
        radius: rich,
        speed: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * The labs and graphs of linear and circular motion. Their labels name the
 * quantities a reader measures; the values come from the motion the reader
 * picks, so no prop holds answer state.
 */
export function motionVisuals<E>(rich: RichSlot<E>) {
  return {
    AccelerationGraphCard: accelerationGraphCard(rich),
    AccelerationLab: accelerationLab(rich),
    NonUniformLinearMotionGraphCard: acceleratedGraphCard(rich),
    NonUniformLinearMotionLab: acceleratedLab(rich),
    UniformCircularMotionLab: uniformCircularLab(rich),
    UniformLinearMotionLab: uniformLinearLab(rich),
  };
}
