import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { cardFields, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** Props of `CathodeRayLab`: Thomson's cathode-ray tube at real size. */
function cathodeRayLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        anode: rich,
        field: rich,
        plates: TextSchema,
        spot: rich,
        view: TextSchema,
      }),
    })
  );
}

/**
 * Props of `MillikanOilDropLab`: Millikan's oil drops between two charged
 * plates.
 */
function millikanOilDropLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        charge: rich,
        field: rich,
        multiple: rich,
        view: TextSchema,
        voltage: TextSchema,
      }),
    })
  );
}

/**
 * Props of `RutherfordScatteringLab`: Rutherford's gold foil, seen at the scale
 * of one nucleus.
 */
function rutherfordScatteringLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      energy: Schema.optionalKey(Schema.Finite),
      labels: Schema.Struct({
        approach: rich,
        energy: TextSchema,
        nucleus: rich,
        ratio: rich,
        view: TextSchema,
      }),
    })
  );
}

/** Props of `BohrEmissionLab`: Bohr's hydrogen atom. */
function bohrEmissionLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      falls: Schema.Array(Schema.Struct({ from: Schema.Int, to: Schema.Int })),
      labels: Schema.Struct({
        choose: TextSchema,
        energy: rich,
        frequency: rich,
        transition: rich,
        view: TextSchema,
        wavelength: rich,
      }),
    })
  );
}

/** Props of `MassSpectrometerLab`: a magnetic sector mass spectrometer. */
function massSpectrometerLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        average: rich,
        choose: TextSchema,
        isotopes: rich,
        north: TextSchema,
        radius: rich,
        ratio: rich,
        south: TextSchema,
        view: TextSchema,
      }),
      samples: Schema.Array(
        Schema.Literals([
          "boron",
          "carbon",
          "neon",
          "magnesium",
          "chlorine",
          "copper",
        ])
      ),
    })
  );
}

/**
 * Props of `ParticleTrackLab`: an electron, a proton and a neutron enter a
 * magnetic field side by side at the same speed.
 */
function particleTrackLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        electron: rich,
        field: TextSchema,
        proton: rich,
        ratio: rich,
        view: TextSchema,
      }),
    })
  );
}

/**
 * Props of `RadioactiveDecayLab`: a sample of 400 carbon-14 nuclei, each
 * turning into nitrogen-14 at its own moment, so no one can say when a single
 * nucleus decays, yet the count halves every 5730 years.
 */
function radioactiveDecayLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        counted: rich,
        expected: rich,
        halfLives: rich,
        time: TextSchema,
        view: TextSchema,
        years: TextSchema,
      }),
    })
  );
}

/**
 * The props of the labs of the experiments that found atomic structure. No prop
 * states the conclusion a lab leads to, so none holds answer state.
 */
export function discoveryVisuals<E>(rich: RichSlot<E>) {
  return {
    CathodeRayLab: cathodeRayLab(rich),
    MillikanOilDropLab: millikanOilDropLab(rich),
    RutherfordScatteringLab: rutherfordScatteringLab(rich),
    BohrEmissionLab: bohrEmissionLab(rich),
    MassSpectrometerLab: massSpectrometerLab(rich),
    ParticleTrackLab: particleTrackLab(rich),
    RadioactiveDecayLab: radioactiveDecayLab(rich),
  };
}
