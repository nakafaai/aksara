import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import {
  byIds,
  cardFields,
  DecimalSeparatorSchema,
  TextSchema,
} from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** The routes the average velocity lab compares. */
const AVERAGE_CASES = ["straight", "bank", "loop"] as const;

/** The trips the velocity and speed lab compares. */
const VELOCITY_CASES = ["forward", "partialReturn", "backToStart"] as const;

/** The routes the displacement and distance lab compares. */
const DISPLACEMENT_CASES = ["straight", "turn", "return"] as const;

/** The two directions an observer can see a target move. */
const DIRECTIONS = ["left", "right"] as const;

/** The cases of relative motion. */
const RELATIVE_CASES = ["same-direction", "opposite-direction"] as const;

/** The motions of the vertical lab: a ball thrown up, or dropped. */
const VERTICAL_MODES = ["throw", "drop"] as const;

/** Props of `AverageVelocitySpeedLab`: average velocity against average speed. */
function averageVelocityLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      decimalSeparator: Schema.optionalKey(DecimalSeparatorSchema),
      labels: Schema.Struct({
        chooseCase: TextSchema,
        factLabels: Schema.Struct({
          displacement: rich,
          distance: rich,
          speed: rich,
          time: rich,
          velocity: rich,
        }),
        modeLabels: byIds(AVERAGE_CASES, rich),
        viewLabel: TextSchema,
      }),
    })
  );
}

/** Props of `InstantaneousVelocitySpeedLab`: velocity and speed at one moment. */
function instantaneousLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseMoment: TextSchema,
        factLabels: Schema.Struct({ speed: rich, time: rich, velocity: rich }),
        viewLabel: TextSchema,
      }),
    })
  );
}

/** Props of `VelocitySpeedLab`: a trip that goes and comes back. */
function velocitySpeedLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseCase: TextSchema,
        factLabels: Schema.Struct({
          displacement: rich,
          distance: rich,
          speed: rich,
          velocity: rich,
        }),
        modeLabels: byIds(VELOCITY_CASES, rich),
        viewLabel: TextSchema,
      }),
    })
  );
}

/** Props of `DisplacementDistanceLab`: the path walked against the change of place. */
function displacementLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseCase: TextSchema,
        factLabels: Schema.Struct({
          displacement: rich,
          distance: rich,
          meaning: rich,
          vector: rich,
        }),
        meanings: byIds(DISPLACEMENT_CASES, rich),
        modeLabels: byIds(DISPLACEMENT_CASES, rich),
        viewLabel: TextSchema,
      }),
    }),
    answerAt(["labels", "meanings"])
  );
}

/** Props of `StoppingDistanceLab`: reaction distance plus braking distance. */
function stoppingDistanceLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        brakingDistance: rich,
        chooseSpeed: TextSchema,
        reactionDistance: rich,
        speed: rich,
        stoppingDistance: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/** Props of `RelativeMovementLab`: motion seen from a moving observer. */
function relativeMovementLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseCase: TextSchema,
        directionLabels: byIds(DIRECTIONS, rich),
        factLabels: Schema.Struct({
          observer: rich,
          relativeVelocity: rich,
          target: rich,
          visibleDirection: rich,
        }),
        modeLabels: byIds(RELATIVE_CASES, rich),
        viewLabel: TextSchema,
      }),
    })
  );
}

/** Props of `VerticalMovementLab`: throws up, throws down, and free fall. */
function verticalMovementLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      decimalSeparator: Schema.optionalKey(DecimalSeparatorSchema),
      labels: Schema.Struct({
        condition: TextSchema,
        finalVelocity: rich,
        initialCondition: rich,
        maxHeight: rich,
        modeLabels: byIds(VERTICAL_MODES, rich),
        time: rich,
        viewLabel: TextSchema,
      }),
    })
  );
}

/**
 * The labs of velocity, distance, and relative motion. The meaning of each
 * route says what its displacement shows, so it is answer state; every other
 * label names a quantity the reader measures.
 */
export function velocityVisuals<E>(rich: RichSlot<E>) {
  return {
    AverageVelocitySpeedLab: averageVelocityLab(rich),
    DisplacementDistanceLab: displacementLab(rich),
    InstantaneousVelocitySpeedLab: instantaneousLab(rich),
    RelativeMovementLab: relativeMovementLab(rich),
    StoppingDistanceLab: stoppingDistanceLab(rich),
    VelocitySpeedLab: velocitySpeedLab(rich),
    VerticalMovementLab: verticalMovementLab(rich),
  };
}
