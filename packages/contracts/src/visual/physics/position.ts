import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/**
 * Props of `StreetOriginPositionLab`: a cyclist rides along a street with a
 * store at zero, Rani's house at 20 m, and a flagpole at 50 m, east positive.
 */
function streetOriginPositionLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        change: rich,
        chooseOrigin: TextSchema,
        end: rich,
        origins: byIds(["store", "house", "pole"], rich),
        start: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * Props of `CityWalkDisplacementLab`: a walk through a town seen from a drone.
 */
function cityWalkDisplacementLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        averageSpeed: rich,
        averageVelocity: rich,
        displacement: rich,
        distance: rich,
        time: rich,
        viewLabel: TextSchema,
      }),
      legs: Schema.NonEmptyArray(
        Schema.Struct({ east: Schema.Finite, north: Schema.Finite })
      ),
      pace: Schema.Finite,
    })
  );
}

/**
 * Props of `RunningTrackDisplacementLab`: a runner on lane 1 of a 400 m
 * athletics track, seen from above.
 */
function runningTrackDisplacementLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        averageVelocity: rich,
        chooseDistance: TextSchema,
        displacement: rich,
        distance: rich,
        time: rich,
        viewLabel: TextSchema,
      }),
      speed: Schema.Finite,
    })
  );
}

/**
 * Props of `CarTripSecantSlopeLab`: a car drives a trip along a straight road
 * while its position-time or velocity-time graph draws below.
 */
function carTripSecantSlopeLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      graph: Schema.optionalKey(Schema.Literals(["position", "velocity"])),
      labels: Schema.Struct({
        change: rich,
        chooseInterval: TextSchema,
        elapsed: rich,
        rate: rich,
        viewLabel: TextSchema,
      }),
      trip: Schema.optionalKey(
        Schema.Literals(["commute", "cruise", "return"])
      ),
    })
  );
}

/**
 * Props of `SpeedTrapInstantSpeedLab`: a speed trap of two light gates around
 * one spot of a test track, which a car crosses while speeding up from rest at
 * 4 m/s².
 */
function speedTrapInstantSpeedLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        averageSpeed: rich,
        chooseGap: TextSchema,
        elapsed: rich,
        gap: rich,
        instantSpeed: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * Props of `BicycleWheelSpeedLab`: a bicycle wheel spinning on a stand, with
 * its valve on the rim and a reflector halfway out.
 */
function bicycleWheelSpeedLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        angularSpeed: rich,
        choosePeriod: TextSchema,
        reflectorSpeed: rich,
        valveAcceleration: rich,
        valveSpeed: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * The props of the position and speed labs. No prop states the conclusion a lab
 * leads to, so none holds answer state.
 */
export function positionVisuals<E>(rich: RichSlot<E>) {
  return {
    StreetOriginPositionLab: streetOriginPositionLab(rich),
    CityWalkDisplacementLab: cityWalkDisplacementLab(rich),
    RunningTrackDisplacementLab: runningTrackDisplacementLab(rich),
    CarTripSecantSlopeLab: carTripSecantSlopeLab(rich),
    SpeedTrapInstantSpeedLab: speedTrapInstantSpeedLab(rich),
    BicycleWheelSpeedLab: bicycleWheelSpeedLab(rich),
  };
}
