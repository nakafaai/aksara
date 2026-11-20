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

/**
 * The waste a school laboratory sorts. Where each one goes is a fact the
 * renderer knows: a living culture, a glove or swab that touched one go to
 * the biohazard bag and the autoclave; a blade and a slide with a specimen to
 * the sharps container; clean broken glass to its box; a dilute salt solution
 * down the sink; an organic solvent to the chemical waste bottle.
 */
const WASTE = [
  "culture",
  "glove",
  "swab",
  "blade",
  "slide",
  "glass",
  "salt",
  "solvent",
] as const;

/**
 * Props of `WasteSortLab`: a waste station at the end of a bench with five
 * places for waste (the sink, a chemical waste bottle, a sharps container, a
 * broken glass box and a biohazard bag beside the autoclave) and a tray of
 * `items`, each once. Picking an item carries it to its place; the readouts
 * name the place and, when `labels.reasons` is given, why it goes there.
 * `labels.autoclave` names the autoclave's steam, temperature and time.
 */
function wasteSortLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      items: Schema.NonEmptyArray(Schema.Literals(WASTE)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        autoclave: rich,
        destination: rich,
        destinations: byIds(
          ["sink", "chemical", "sharps", "glassBox", "biohazard"],
          rich
        ),
        item: TextSchema,
        items: byPickedIds(WASTE, TextSchema),
        reason: Schema.optionalKey(rich),
        reasons: Schema.optionalKey(byPickedIds(WASTE, rich)),
        view: TextSchema,
      }),
    }).check(
      Schema.makeFilter(({ items, labels }) => namesEach(items, labels.items), {
        message: "Expected a name for every item on the tray, and no other.",
      }),
      Schema.makeFilter(
        ({ items, labels }) =>
          labels.reasons === undefined
            ? labels.reason === undefined
            : labels.reason !== undefined && namesEach(items, labels.reasons),
        {
          message:
            "Expected the reasons, when given, to explain every item on the tray under a heading of their own.",
        }
      )
    ),
    answerAt(["labels", "reasons"])
  );
}

/**
 * The waste lab. Why an item goes where it goes is the reasoning a question
 * asks for, so the reasons are answer state.
 */
export function wasteVisuals<E>(rich: RichSlot<E>) {
  return { WasteSortLab: wasteSortLab(rich) };
}
