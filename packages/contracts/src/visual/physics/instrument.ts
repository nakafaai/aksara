import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { cardFields, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/**
 * Props of `MicrometerScrewLab`: a micrometer screw gauge closed on a steel
 * ball, with a magnifier on its sleeve and thimble.
 */
function micrometerScrewLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        division: rich,
        reading: rich,
        size: TextSchema,
        sleeve: rich,
        viewLabel: TextSchema,
      }),
      thickness: Schema.optionalKey(Schema.Finite),
    })
  );
}

/**
 * Props of `VernierCaliperLab`: a vernier caliper closed on a brass cylinder,
 * with a magnifier on its scales.
 */
function vernierCaliperLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        centimetres: rich,
        line: rich,
        main: rich,
        reading: rich,
        viewLabel: TextSchema,
        width: TextSchema,
      }),
      width: Schema.optionalKey(Schema.Finite),
    })
  );
}

/**
 * Props of `MicroscopeScaleLab`: a hair seen through a microscope with a scale
 * in its eyepiece.
 */
function microscopeScaleLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseObjective: TextSchema,
        diameter: rich,
        divisions: rich,
        metres: rich,
        oneDivision: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * Props of `ParallaxReadingLab`: an eye reading the water in a measuring
 * cylinder.
 */
function parallaxReadingLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        error: rich,
        eye: TextSchema,
        reading: rich,
        trueVolume: rich,
        viewLabel: TextSchema,
      }),
      offset: Schema.optionalKey(Schema.Finite),
    })
  );
}

/** Props of `LightGateSpeedLab`: a trolley rolling through two light gates. */
function lightGateSpeedLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      distance: Schema.optionalKey(Schema.Finite),
      labels: Schema.Struct({
        distance: TextSchema,
        speed: rich,
        time: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * Props of `StopwatchSpreadLab`: ten swings of a pendulum timed by hand, trial
 * after trial.
 */
function stopwatchSpreadLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      count: Schema.optionalKey(Schema.Finite),
      labels: Schema.Struct({
        mean: rich,
        spread: rich,
        trials: TextSchema,
        uncertainty: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * Props of `PendulumPeriodLab`: three pendulums of one length with a 50 g
 * wooden bob, a 200 g brass bob and a 500 g lead bob.
 */
function pendulumPeriodLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        check: rich,
        gravity: rich,
        length: TextSchema,
        masses: rich,
        period: rich,
        viewLabel: TextSchema,
      }),
      length: Schema.optionalKey(Schema.Finite),
    })
  );
}

/**
 * The props of the labs that read a measuring instrument. No prop states the
 * conclusion a lab leads to, so none holds answer state.
 */
export function instrumentVisuals<E>(rich: RichSlot<E>) {
  return {
    MicrometerScrewLab: micrometerScrewLab(rich),
    VernierCaliperLab: vernierCaliperLab(rich),
    MicroscopeScaleLab: microscopeScaleLab(rich),
    ParallaxReadingLab: parallaxReadingLab(rich),
    LightGateSpeedLab: lightGateSpeedLab(rich),
    StopwatchSpreadLab: stopwatchSpreadLab(rich),
    PendulumPeriodLab: pendulumPeriodLab(rich),
  };
}
