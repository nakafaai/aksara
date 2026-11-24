import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import {
  byIds,
  byPickedIds,
  cardFields,
  namesEach,
  TextSchema,
} from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** Orbital eccentricity bounded inside an elliptical orbit (0 <= e <= 0.85). */
const EccentricitySchema = Schema.Finite.check(
  Schema.isGreaterThanOrEqualTo(0),
  Schema.isLessThanOrEqualTo(0.85)
);

/** An eccentricity slider whose minimum sits below its maximum. */
const EccentricitySliderSchema = Schema.Struct({
  max: EccentricitySchema,
  min: EccentricitySchema,
  value: EccentricitySchema,
}).check(
  Schema.makeFilter(
    ({ max, min, value }) => min < max && min <= value && value <= max,
    {
      message:
        "Expected an eccentricity range whose minimum is below its maximum, with the starting value between them.",
    }
  )
);

const ORBITING_BODIES = [
  "mercury",
  "venus",
  "earth",
  "mars",
  "jupiter",
  "comet",
] as const;

/** Props of `OrbitRadiusLab`: two satellites in circular orbits round the Earth, drawn to scale. */
function orbitRadiusLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      knownHeight: Schema.Finite,
      knownPeriod: Schema.Finite,
      labels: Schema.Struct({
        knownName: TextSchema,
        knownRadius: rich,
        otherName: TextSchema,
        otherPeriod: rich,
        otherRadius: rich,
        viewLabel: TextSchema,
      }),
      otherHeight: Schema.Finite,
    })
  );
}

/** Props of `PlanetCompareLab`: the Earth and another planet side by side at the same scale, each with a satellite skimming its surface. */
function planetCompareLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        earthName: TextSchema,
        escape: rich,
        gravity: rich,
        orbit: rich,
        period: rich,
        planetName: TextSchema,
        viewLabel: TextSchema,
      }),
      mass: Schema.Finite,
      radius: Schema.Finite,
    })
  );
}

/**
 * Props of `KeplerOrbitPeriodLab`: a 3D heliocentric elliptical orbit lab
 * demonstrating Kepler's three laws, equal-area sweeps between perihelion and
 * aphelion, and the constant T squared over r cubed ratio. Orbital period and
 * speed readouts are optional answer state.
 */
function keplerOrbitPeriodLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      bodies: Schema.NonEmptyArray(Schema.Literals(ORBITING_BODIES)).check(
        Schema.isUnique()
      ),
      eccentricity: EccentricitySliderSchema,
      labels: Schema.Struct({
        bodies: byPickedIds(ORBITING_BODIES, TextSchema),
        body: TextSchema,
        eccentricity: TextSchema,
        parts: byIds(
          ["sun", "planet", "perihelion", "aphelion", "focus", "areaSector"],
          TextSchema
        ),
        period: Schema.optionalKey(rich),
        radius: rich,
        ratio: rich,
        speed: Schema.optionalKey(rich),
        view: TextSchema,
      }),
    }).check(
      Schema.makeFilter(
        ({ bodies, labels }) => namesEach(bodies, labels.bodies),
        {
          message:
            "Expected a name for every orbiting body shown in the Kepler lab, and no other.",
        }
      )
    ),
    answerAt(["labels", "period"], ["labels", "speed"])
  );
}

/** The props of the gravitation and Kepler orbital labs. */
export function gravityVisuals<E>(rich: RichSlot<E>) {
  return {
    KeplerOrbitPeriodLab: keplerOrbitPeriodLab(rich),
    OrbitRadiusLab: orbitRadiusLab(rich),
    PlanetCompareLab: planetCompareLab(rich),
  };
}
