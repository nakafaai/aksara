import { Array as Arr, Schema } from "effect";
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
 * Organisms whose full classification from kingdom to species is cited data
 * in the renderer's model: four cats and bears that share more or fewer ranks,
 * the Malayan tapir, the rhinoceros hornbill, Rajah Brooke's birdwing and rice.
 */
const ORGANISMS = [
  "tiger",
  "leopard",
  "leopardCat",
  "sunBear",
  "tapir",
  "hornbill",
  "birdwing",
  "padi",
] as const;

const OrganismSchema = Schema.Literals(ORGANISMS);

/**
 * Props of `TaxonRankLab`: seven nested trays from kingdom down to species,
 * holding small models of `organisms` (each once). The learner picks two of
 * them, starting with `pair`, and the trays they share light up; the
 * readouts give the lowest rank they share and how many ranks that is.
 */
function taxonRankLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        count: rich,
        first: TextSchema,
        none: rich,
        organisms: byPickedIds(ORGANISMS, TextSchema),
        ranks: byIds(
          ["kingdom", "phylum", "class", "order", "family", "genus", "species"],
          TextSchema
        ),
        second: TextSchema,
        shared: rich,
        view: TextSchema,
      }),
      organisms: Schema.NonEmptyArray(OrganismSchema).check(Schema.isUnique()),
      pair: Schema.Tuple([OrganismSchema, OrganismSchema]),
    }).check(
      Schema.makeFilter(
        ({ labels, organisms, pair }) =>
          namesEach(organisms, labels.organisms) &&
          pair[0] !== pair[1] &&
          Arr.every(pair, (organism) => Arr.contains(organisms, organism)),
        {
          message:
            "Expected a name for every organism shown, and a starting pair of two different organisms from them.",
        }
      )
    )
  );
}

/** The taxon lab. The shared ranks are shown as the learner compares; no prop is answer state. */
export function taxonVisuals<E>(rich: RichSlot<E>) {
  return { TaxonRankLab: taxonRankLab(rich) };
}
