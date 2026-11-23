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

/**
 * Garden plants whose scientific names the renderer's model holds as cited
 * data: three share the second word `indica` or the genus `Ipomoea`, so the
 * learner sees which word names the genus.
 */
const PLANTS = [
  "kangkung",
  "sweetPotato",
  "mango",
  "beluntas",
  "neem",
  "padi",
] as const;

/**
 * Props of `GardenNameLab`: a school garden with `plants` (each once), each
 * with a name tag. The learner switches the tags between printed and
 * handwritten style and highlights the plants that share the first or the
 * second word; the readouts give the genus, the second word and the family.
 */
function gardenNameLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        epithet: rich,
        family: rich,
        genus: rich,
        match: TextSchema,
        matches: byIds(["genus", "epithet"], TextSchema),
        plant: TextSchema,
        plants: byPickedIds(PLANTS, TextSchema),
        style: TextSchema,
        styles: byIds(["printed", "handwritten"], TextSchema),
        view: TextSchema,
      }),
      plants: Schema.NonEmptyArray(Schema.Literals(PLANTS)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, plants }) => namesEach(plants, labels.plants),
        {
          message: "Expected a name for every plant shown, and no other.",
        }
      )
    )
  );
}

/** The garden name lab. Every prop names what the learner explores; none is answer state. */
export function binomialVisuals<E>(rich: RichSlot<E>) {
  return { GardenNameLab: gardenNameLab(rich) };
}
