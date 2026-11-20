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

/** What crosses the placenta, and the blood cells that do not. */
const SUBSTANCES = [
  "oxygen",
  "glucose",
  "aminoAcids",
  "antibodies",
  "carbonDioxide",
  "urea",
  "alcohol",
  "bloodCells",
] as const;

/**
 * Props of `PlacentaLab`: a placenta cut open, with the mother's blood
 * around a villus and the foetus's blood inside its capillaries, never mixing.
 * The learner picks one of `substances` (each once) and follows it across;
 * the readouts give its direction and how it crosses, words from
 * `labels.substances`, one entry for each substance shown and no other.
 */
function placentaLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        direction: rich,
        how: rich,
        parts: byIds(
          [
            "placenta",
            "cord",
            "artery",
            "vein",
            "villus",
            "capillary",
            "maternal",
            "wall",
            "amnion",
            "foetus",
          ],
          TextSchema
        ),
        substance: TextSchema,
        substances: byPickedIds(
          SUBSTANCES,
          Schema.Struct({ direction: rich, how: rich, name: TextSchema })
        ),
        view: TextSchema,
      }),
      substances: Schema.NonEmptyArray(Schema.Literals(SUBSTANCES)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, substances }) => namesEach(substances, labels.substances),
        {
          message:
            "Expected words for every substance the lab shows, and no other.",
        }
      )
    )
  );
}

/** The placenta lab. Every prop names what the learner explores; none is answer state. */
export function placentaVisuals<E>(rich: RichSlot<E>) {
  return { PlacentaLab: placentaLab(rich) };
}
