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

const NUCLIDES = [
  "deuterium",
  "helium4",
  "carbon12",
  "iron56",
  "uranium235",
] as const;

const NUCLEAR_PROCESSES = ["fusion", "fission"] as const;

/** Props of `HalfLifeCounterLab`: a Geiger-Muller counter in front of a radioactive sample records its rate over time. */
function halfLifeCounterLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      background: Schema.Finite,
      first: Schema.Finite,
      labels: Schema.Struct({
        end: rich,
        halfLife: rich,
        start: rich,
        viewLabel: TextSchema,
      }),
      later: Schema.Finite,
      time: Schema.Finite,
    })
  );
}

/** Props of `FissionLab`: a slow neutron splits a uranium nucleus into two fragments and a few fast neutrons. */
function fissionLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      fragments: Schema.Tuple([Schema.Finite, Schema.Finite]),
      labels: Schema.Struct({
        defect: rich,
        energy: rich,
        kilograms: rich,
        viewLabel: TextSchema,
      }),
      lightSpeed: Schema.Finite,
      neutron: Schema.Finite,
      parent: Schema.Finite,
      released: Schema.Finite,
      unit: Schema.Finite,
    })
  );
}

/** Props of `PhotoelectricLab`: light falls on a metal plate in an evacuated tube. */
function photoelectricLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      charge: Schema.Finite,
      labels: Schema.Struct({
        energy: rich,
        intensity: rich,
        intensityName: TextSchema,
        kinetic: rich,
        none: rich,
        viewLabel: TextSchema,
        wavelength: rich,
        wavelengthName: TextSchema,
      }),
      lightSpeed: Schema.Finite,
      planck: Schema.Finite,
      wavelength: Schema.Finite,
      workFunction: Schema.Finite,
    })
  );
}

/**
 * Props of `NuclearBindingCurveLab`: a 3D nucleon cluster and binding-energy
 * per nucleon curve contrasting light fusion, the iron-56 stability peak, and
 * heavy fission. Binding energy per nucleon and mass defect readouts are
 * optional answer state.
 */
function nuclearBindingCurveLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        bindingPerNucleon: Schema.optionalKey(rich),
        massDefect: Schema.optionalKey(rich),
        nuclide: TextSchema,
        nuclides: byPickedIds(NUCLIDES, TextSchema),
        parts: byIds(
          ["proton", "neutron", "ironPeak", "fusionZone", "fissionZone"],
          TextSchema
        ),
        process: TextSchema,
        processes: byPickedIds(
          NUCLEAR_PROCESSES,
          Schema.Struct({
            detail: rich,
            name: TextSchema,
          })
        ),
        stability: rich,
        view: TextSchema,
      }),
      nuclides: Schema.NonEmptyArray(Schema.Literals(NUCLIDES)).check(
        Schema.isUnique()
      ),
      processes: Schema.NonEmptyArray(Schema.Literals(NUCLEAR_PROCESSES)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, nuclides, processes }) =>
          namesEach(nuclides, labels.nuclides) &&
          namesEach(processes, labels.processes),
        {
          message:
            "Expected a name for every nuclide and nuclear process shown, and no other.",
        }
      )
    ),
    answerAt(["labels", "bindingPerNucleon"], ["labels", "massDefect"])
  );
}

/**
 * The props of the nuclear and quantum physics labs covering half-life,
 * fission, binding-energy stability, and photoelectric emission.
 */
export function nuclearVisuals<E>(rich: RichSlot<E>) {
  return {
    FissionLab: fissionLab(rich),
    HalfLifeCounterLab: halfLifeCounterLab(rich),
    NuclearBindingCurveLab: nuclearBindingCurveLab(rich),
    PhotoelectricLab: photoelectricLab(rich),
  };
}
