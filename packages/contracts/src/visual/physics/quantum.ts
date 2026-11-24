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

/** A strictly positive finite setting for quantum physics sliders. */
const PositiveSchema = Schema.Finite.check(Schema.isGreaterThan(0));

/** A strictly positive slider whose minimum sits below its maximum. */
const PositiveSliderSchema = Schema.Struct({
  max: PositiveSchema,
  min: PositiveSchema,
  value: PositiveSchema,
}).check(
  Schema.makeFilter(
    ({ max, min, value }) => min < max && min <= value && value <= max,
    {
      message:
        "Expected a positive slider range whose minimum is below its maximum, with the starting value between them.",
    }
  )
);

const PARTICLES = ["electron", "proton", "neutron", "alpha"] as const;
const RADIATION_MODELS = ["planck", "classical"] as const;

/**
 * Props of `DeBroglieMatterWaveLab`: a 3D electron-diffraction tube and
 * standing matter-wave view linking accelerating voltage and particle mass to
 * de Broglie wavelength and diffraction ring spacing. Wavelength and
 * diffraction readouts are optional answer state.
 */
function deBroglieMatterWaveLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        diffraction: Schema.optionalKey(rich),
        momentum: rich,
        particle: TextSchema,
        particles: byPickedIds(PARTICLES, TextSchema),
        parts: byIds(
          [
            "electronGun",
            "graphiteTarget",
            "matterWave",
            "diffractionRings",
            "screen",
          ],
          TextSchema
        ),
        view: TextSchema,
        voltage: TextSchema,
        wavelength: Schema.optionalKey(rich),
      }),
      particles: Schema.NonEmptyArray(Schema.Literals(PARTICLES)).check(
        Schema.isUnique()
      ),
      voltage: PositiveSliderSchema,
    }).check(
      Schema.makeFilter(
        ({ labels, particles }) => namesEach(particles, labels.particles),
        {
          message:
            "Expected a name for every particle shown in the matter-wave lab, and no other.",
        }
      )
    ),
    answerAt(["labels", "diffraction"], ["labels", "wavelength"])
  );
}

/**
 * Props of `PlanckBlackbodyLab`: a 3D heated cavity radiator synchronized with
 * Planck's quantized blackbody spectrum and the classical Rayleigh-Jeans curve
 * across Kelvin temperature. Peak wavelength and photon energy readouts are
 * optional answer state.
 */
function planckBlackbodyLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        model: TextSchema,
        models: byPickedIds(RADIATION_MODELS, TextSchema),
        parts: byIds(
          [
            "cavity",
            "planckCurve",
            "classicalCurve",
            "visibleBand",
            "peakMarker",
          ],
          TextSchema
        ),
        peakWavelength: Schema.optionalKey(rich),
        photonEnergy: Schema.optionalKey(rich),
        spectrum: rich,
        temperature: TextSchema,
        view: TextSchema,
      }),
      models: Schema.NonEmptyArray(Schema.Literals(RADIATION_MODELS)).check(
        Schema.isUnique()
      ),
      temperature: PositiveSliderSchema,
    }).check(
      Schema.makeFilter(
        ({ labels, models }) => namesEach(models, labels.models),
        {
          message:
            "Expected a name for every radiation model shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "peakWavelength"], ["labels", "photonEnergy"])
  );
}

/**
 * Quantum physics labs covering de Broglie matter-wave diffraction and
 * Planck blackbody quantization.
 */
export function quantumVisuals<E>(rich: RichSlot<E>) {
  return {
    DeBroglieMatterWaveLab: deBroglieMatterWaveLab(rich),
    PlanckBlackbodyLab: planckBlackbodyLab(rich),
  };
}
