import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import {
  byIds,
  cardFields,
  factSchema,
  TextSchema,
} from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** The ions the ion lab forms. */
const ION_SAMPLES = [
  "sodium-cation",
  "fluoride-anion",
  "lithium-cation",
  "oxide-anion",
] as const;

/** The isotopes the isotope lab compares. */
const ISOTOPE_SAMPLES = [
  "hydrogen-1",
  "deuterium",
  "tritium",
  "carbon-12",
  "carbon-13",
  "carbon-14",
] as const;

/** The particles the matter reader sorts. */
const MATTER_MODES = [
  "atom",
  "element",
  "elemental-molecule",
  "compound-molecule",
] as const;

/** The properties the subatomic property lab compares. */
const PROPERTY_MODES = ["charge", "mass", "location"] as const;

/** The experiments that found the subatomic particles. */
const DISCOVERY_MODES = ["cathode-ray", "gold-foil", "atom-map"] as const;

/** Props of `IonLab`: an atom that gains or loses electrons. */
function ionLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        afterChange: TextSchema,
        beforeChange: TextSchema,
        charge: TextSchema,
        chooseIon: TextSchema,
        electronChange: TextSchema,
        electrons: TextSchema,
        neutralAtom: TextSchema,
        neutrons: TextSchema,
        protons: TextSchema,
        samples: byIds(
          ION_SAMPLES,
          Schema.Struct({ action: rich, name: TextSchema, type: TextSchema })
        ),
      }),
    })
  );
}

/** Props of `IsotopeLab`: atoms of one element with different neutron counts. */
function isotopeLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        abundance: TextSchema,
        atomicNumber: TextSchema,
        chooseIsotope: TextSchema,
        electrons: TextSchema,
        massNumber: TextSchema,
        neutrons: TextSchema,
        protons: TextSchema,
        samples: byIds(
          ISOTOPE_SAMPLES,
          Schema.Struct({
            abundance: rich,
            ariaName: TextSchema,
            name: rich,
            note: rich,
            tab: rich,
          })
        ),
      }),
    }),
    answerAt(["labels", "samples", "*", "note"])
  );
}

/** Props of `MatterParticleReaderLab`: atoms, elements, and molecules. */
function matterParticleReaderLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        categoryLabel: TextSchema,
        chooseMode: TextSchema,
        modes: byIds(
          MATTER_MODES,
          Schema.Struct({
            category: rich,
            helperCaption: rich,
            reading: rich,
            tab: rich,
            tabLabel: TextSchema,
          })
        ),
        particleView: TextSchema,
        readingLabel: TextSchema,
      }),
    }),
    answerAt(
      ["labels", "modes", "*", "category"],
      ["labels", "modes", "*", "reading"]
    )
  );
}

/** Props of `SubatomicParticlePropertiesLab`: charge, mass, and place of each particle. */
function subatomicParticlePropertiesLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseMode: TextSchema,
        modes: byIds(
          PROPERTY_MODES,
          Schema.Struct({
            facts: Schema.Array(factSchema(rich)),
            summary: rich,
            tab: TextSchema,
          })
        ),
        scene: Schema.Struct({
          electron: rich,
          electronRegion: rich,
          negativePlate: rich,
          neutron: rich,
          nucleus: rich,
          positivePlate: rich,
          proton: rich,
        }),
      }),
    }),
    answerAt(["labels", "modes", "*", "summary"])
  );
}

/** Props of `SubatomicParticlesLab`: the experiments that found each particle. */
function subatomicParticlesLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseMode: TextSchema,
        modes: byIds(
          DISCOVERY_MODES,
          Schema.Struct({
            description: rich,
            facts: Schema.Array(factSchema(rich)),
            tab: TextSchema,
          })
        ),
        scene: Schema.Struct({
          alphaParticle: rich,
          anode: rich,
          cathode: rich,
          cathodeRay: rich,
          negativePlate: rich,
          nucleus: rich,
          positivePlate: rich,
        }),
      }),
    })
  );
}

/**
 * The particle labs. A category and a reading say what a particle is, a note
 * says what an isotope shows, and a summary says what a property means, so
 * each is answer state.
 */
export function particleVisuals<E>(rich: RichSlot<E>) {
  return {
    IonLab: ionLab(rich),
    IsotopeLab: isotopeLab(rich),
    MatterParticleReaderLab: matterParticleReaderLab(rich),
    SubatomicParticlePropertiesLab: subatomicParticlePropertiesLab(rich),
    SubatomicParticlesLab: subatomicParticlesLab(rich),
  };
}
