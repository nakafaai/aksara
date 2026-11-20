import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import {
  byIds,
  byPickedIds,
  cardFields,
  namesEach,
  TextSchema,
} from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

const LEVELS = ["primary", "secondary", "tertiary", "quaternary"] as const;
const CONDITIONS = ["normal", "heated", "acid"] as const;

/**
 * Props of `ProteinFoldLab`: one protein from its chain of amino acids to its
 * folded working shape. The learner steps through `levels` of structure and
 * sets one of `conditions` (each once, in the order the toggles list them);
 * heat and acid break the bonds that hold the fold while the peptide bonds
 * stay, and the readouts say which bonds hold the level, whether the peptide
 * bonds stay and whether the protein still works.
 */
function proteinFoldLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      conditions: Schema.NonEmptyArray(Schema.Literals(CONDITIONS)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        bonds: byIds(["peptide", "hydrogen", "ionic", "hydrophobic"], rich),
        condition: TextSchema,
        conditions: byPickedIds(CONDITIONS, TextSchema),
        holds: rich,
        level: TextSchema,
        levels: byPickedIds(LEVELS, TextSchema),
        no: rich,
        parts: byIds(["chain", "helix", "sheet", "haem"], TextSchema),
        peptide: rich,
        view: TextSchema,
        works: rich,
        yes: rich,
      }),
      levels: Schema.NonEmptyArray(Schema.Literals(LEVELS)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ conditions, labels, levels }) =>
          namesEach(levels, labels.levels) &&
          namesEach(conditions, labels.conditions),
        {
          message:
            "Expected a name for every level and condition the lab shows, and no other.",
        }
      )
    )
  );
}

/** The protein lab. Every prop names what the learner explores; none is answer state. */
export function proteinVisuals<E>(rich: RichSlot<E>) {
  return { ProteinFoldLab: proteinFoldLab(rich) };
}
