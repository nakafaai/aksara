import { Schema } from "effect";

import {
  byIds,
  cardFields,
  type RichSlot,
  TextSchema,
} from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/** The cutting stages of the ancient atom thought experiment. */
const ANCIENT_LEVELS = [
  "whole",
  "first-cut",
  "second-cut",
  "fine-cut",
] as const;

/** The atoms the shell model lab can show. */
export const SHELL_SAMPLES = [
  "neon",
  "magnesium",
  "chlorine",
  "argon",
  "potassium",
  "calcium",
] as const;

/** The nuclides the atom symbol lab reads. */
const SYMBOL_SAMPLES = [
  "carbon-12",
  "oxygen-16",
  "sodium-23",
  "chlorine-35",
] as const;

/** The three pieces of evidence for Dalton's atomic theory. */
const DALTON_MODES = ["conservation", "fixed", "multiple"] as const;

/** Props of `AncientAtomLab`: cutting matter until it can be cut no more. */
function ancientAtomLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        aristotleBody: rich,
        aristotleLabel: TextSchema,
        chooseLevel: TextSchema,
        democritusBody: rich,
        democritusLabel: TextSchema,
        levels: byIds(ANCIENT_LEVELS, Schema.Struct({ tab: TextSchema })),
      }),
    })
  );
}

/** Props of `AtomShellLab`: the electron shells of one atom at a time. */
function atomShellLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      defaultSampleId: Schema.optionalKey(Schema.Literals(SHELL_SAMPLES)),
      description: Schema.optionalKey(rich),
      labels: Schema.Struct({
        atomicNumber: TextSchema,
        chooseAtom: TextSchema,
        configuration: TextSchema,
        electronTotal: TextSchema,
        maximumCapacity: TextSchema,
        outerShell: TextSchema,
        samples: byIds(
          SHELL_SAMPLES,
          Schema.Struct({
            name: Schema.optionalKey(TextSchema),
            note: Schema.optionalKey(rich),
            tab: TextSchema,
          })
        ),
      }),
      title: Schema.optionalKey(rich),
    }),
    answerAt(["labels", "samples", "*", "note"])
  );
}

/** Props of `AtomSymbolLab`: reading the particles of a nuclide from its symbol. */
function atomSymbolLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        atomicNumber: TextSchema,
        chooseAtom: TextSchema,
        electronCount: TextSchema,
        elementSymbol: TextSchema,
        massNumber: TextSchema,
        neutralAtom: TextSchema,
        neutronCount: TextSchema,
        protonCount: TextSchema,
        samples: byIds(
          SYMBOL_SAMPLES,
          Schema.Struct({ ariaName: TextSchema, name: rich, tab: rich })
        ),
      }),
    })
  );
}

/** Props of `DaltonEvidenceLab`: the reactions behind Dalton's theory. */
function daltonEvidenceLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        chooseMode: TextSchema,
        modes: byIds(
          DALTON_MODES,
          Schema.Struct({
            afterTitle: TextSchema,
            beforeTitle: TextSchema,
            expression: TextSchema,
            facts: Schema.Array(
              Schema.Struct({ label: TextSchema, value: TextSchema })
            ),
            tab: TextSchema,
          })
        ),
      }),
    })
  );
}

/**
 * The atom labs. A sample note of the shell model states the configuration
 * and the outer shell it leads to, so it is answer state; every other label
 * names what the lab draws.
 */
export function atomVisuals<E>(rich: RichSlot<E>) {
  return {
    AncientAtomLab: ancientAtomLab(rich),
    AtomShellLab: atomShellLab(rich),
    AtomSymbolLab: atomSymbolLab(rich),
    DaltonEvidenceLab: daltonEvidenceLab(rich),
  };
}
