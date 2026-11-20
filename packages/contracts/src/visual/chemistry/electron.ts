import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { byIds, cardFields, TextSchema } from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** The atoms the electron configuration lab can show. */
const CONFIGURATION_SAMPLES = [
  "hydrogen",
  "helium",
  "carbon",
  "neon",
  "sodium",
  "magnesium",
  "chlorine",
  "calcium",
] as const;

/** The atoms the valence electron lab can show. */
const VALENCE_SAMPLES = [
  "hydrogen",
  "helium",
  "sodium",
  "magnesium",
  "aluminum",
  "chlorine",
  "argon",
  "calcium",
] as const;

/** Props of `ElectronConfigurationLab`: filling shells for one atom at a time. */
function electronConfigurationLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        atomicNumber: TextSchema,
        chooseAtom: TextSchema,
        configuration: TextSchema,
        electronTotal: TextSchema,
        outerShell: TextSchema,
        samples: byIds(
          CONFIGURATION_SAMPLES,
          Schema.Struct({ name: TextSchema, note: rich })
        ),
      }),
    }),
    answerAt(["labels", "samples", "*", "note"])
  );
}

/** Props of `ValenceElectronLab`: the outer electrons and what they tend to do. */
function valenceElectronLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        atomicNumber: TextSchema,
        behavior: TextSchema,
        chooseAtom: TextSchema,
        configuration: TextSchema,
        outerShell: TextSchema,
        samples: byIds(
          VALENCE_SAMPLES,
          Schema.Struct({
            name: TextSchema,
            note: rich,
            tab: TextSchema,
            tendency: rich,
          })
        ),
        valenceElectron: TextSchema,
      }),
    }),
    answerAt(
      ["labels", "samples", "*", "note"],
      ["labels", "samples", "*", "tendency"]
    )
  );
}

/**
 * The electron labs. A sample note states the configuration it leads to, and
 * a tendency states how the atom reacts, so both are answer state.
 */
export function electronVisuals<E>(rich: RichSlot<E>) {
  return {
    ElectronConfigurationLab: electronConfigurationLab(rich),
    ValenceElectronLab: valenceElectronLab(rich),
  };
}
