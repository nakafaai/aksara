import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** A point on the orienteering map: metres east and north of the start. */
const MARK = Schema.Struct({ east: Schema.Finite, north: Schema.Finite });

/**
 * Props of `AircraftCrosswindLab`: an airliner over farmland in a crosswind,
 * seen from above.
 */
function aircraftCrosswindLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      airspeed: Schema.Finite,
      heading: Schema.optionalKey(Schema.Finite),
      labels: Schema.Struct({
        between: rich,
        drift: rich,
        groundSpeed: rich,
        heading: rich,
        headingName: TextSchema,
        track: rich,
        viewLabel: TextSchema,
      }),
      toward: Schema.Finite,
      wind: Schema.Finite,
    })
  );
}

/**
 * Props of `DroneDisplacementLab`: a drone takes off from a pad in a field and
 * flies its plan leg by leg.
 */
function droneDisplacementLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      factors: Schema.optionalKey(Schema.Array(Schema.Finite)),
      hops: Schema.NonEmptyArray(
        Schema.Struct({
          east: Schema.Finite,
          north: Schema.Finite,
          up: Schema.Finite,
        })
      ),
      labels: Schema.Struct({
        chooseFactor: TextSchema,
        displacement: rich,
        path: rich,
        size: rich,
        viewLabel: TextSchema,
      }),
      units: Schema.optionalKey(Schema.Boolean),
    })
  );
}

/**
 * Props of `OrienteeringMapVectorLab`: an orienteering map of a city park with
 * the start O (fuchsia triangle) and the checkpoints A, B and C in teal, amber
 * and pink rings.
 */
function orienteeringMapVectorLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        angle: rich,
        chooseView: TextSchema,
        east: rich,
        north: rich,
        size: rich,
        viewLabel: TextSchema,
        views: byIds(["forward", "back", "copy", "difference"], rich),
      }),
      marks: Schema.Struct({ a: MARK, b: MARK, c: MARK }),
      views: Schema.optionalKey(
        Schema.Array(Schema.Literals(["forward", "back", "copy", "difference"]))
      ),
    })
  );
}

/**
 * Props of `ShipBearingComponentLab`: a ferry leaves its harbour in legs, each
 * a distance on a compass bearing.
 */
function shipBearingComponentLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      courses: Schema.NonEmptyArray(
        Schema.Struct({
          bearing: Schema.Finite,
          distance: Schema.Finite.check(Schema.isGreaterThan(0)),
        })
      ),
      labels: Schema.Struct({
        bearing: rich,
        bearingName: TextSchema,
        direction: rich,
        distance: rich,
        east: rich,
        north: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/** Props of `WindMapVectorLab`: a steady sea wind on a weather map. */
function windMapVectorLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      angle: Schema.Finite,
      labels: Schema.Struct({
        angle: rich,
        angleName: TextSchema,
        east: rich,
        north: rich,
        speed: rich,
        speedName: TextSchema,
        viewLabel: TextSchema,
      }),
      speed: Schema.Finite,
    })
  );
}

/**
 * The props of the labs that add and resolve displacement vectors. No prop
 * states the conclusion a lab leads to, so none holds answer state.
 */
export function vectorVisuals<E>(rich: RichSlot<E>) {
  return {
    AircraftCrosswindLab: aircraftCrosswindLab(rich),
    DroneDisplacementLab: droneDisplacementLab(rich),
    OrienteeringMapVectorLab: orienteeringMapVectorLab(rich),
    ShipBearingComponentLab: shipBearingComponentLab(rich),
    WindMapVectorLab: windMapVectorLab(rich),
  };
}
