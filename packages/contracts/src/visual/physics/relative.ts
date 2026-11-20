import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/**
 * Props of `RainDriveRelativeVelocityLab`: rain falling straight down on a
 * still day, watched from the roadside or from inside a moving car.
 */
function rainDriveRelativeVelocityLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      car: Schema.optionalKey(Schema.Finite),
      labels: Schema.Struct({
        angle: rich,
        apparentSpeed: rich,
        carSpeed: rich,
        carSpeedName: TextSchema,
        chooseFrame: TextSchema,
        frames: byIds(["ground", "car"], rich),
        rainSpeed: rich,
        viewLabel: TextSchema,
      }),
      rain: Schema.optionalKey(Schema.Finite),
    })
  );
}

/**
 * Props of `RiverBoatCrossingLab`: a boat crossing a flowing river, seen from
 * above.
 */
function riverBoatCrossingLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      boatSpeed: Schema.Finite,
      current: Schema.Finite,
      heading: Schema.optionalKey(Schema.Finite),
      labels: Schema.Struct({
        angle: rich,
        drift: rich,
        groundSpeed: rich,
        heading: rich,
        headingName: TextSchema,
        time: rich,
        viewLabel: TextSchema,
      }),
      width: Schema.Finite,
    })
  );
}

/**
 * Props of `TrainPassengerRelativeLab`: a passenger walks along a commuter
 * carriage moving at 20 m/s.
 */
function trainPassengerRelativeLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseObserver: TextSchema,
        chooseWay: TextSchema,
        observers: byIds(["platform", "train"], rich),
        passenger: rich,
        train: rich,
        viewLabel: TextSchema,
        walk: rich,
        ways: byIds(["forward", "backward"], rich),
      }),
    })
  );
}

/**
 * The props of the relative velocity labs. No prop states the conclusion a lab
 * leads to, so none holds answer state.
 */
export function relativeVisuals<E>(rich: RichSlot<E>) {
  return {
    RainDriveRelativeVelocityLab: rainDriveRelativeVelocityLab(rich),
    RiverBoatCrossingLab: riverBoatCrossingLab(rich),
    TrainPassengerRelativeLab: trainPassengerRelativeLab(rich),
  };
}
