import { Array as Arr, Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import {
  byPickedIds,
  cardFields,
  namesEach,
  TextSchema,
} from "#contracts/visual/card";
import { answerAt, figure } from "#contracts/visual/entry";

/**
 * Sea animals of Malaysian waters whose everyday names mislead: the dugong and
 * the whale are mammals, the jellyfish and the sea star are not fish, and the
 * mackerel is. Each one's scientific name and real group are cited data in the
 * renderer's model.
 */
const ANIMALS = [
  "dugong",
  "whale",
  "jellyfish",
  "seaStar",
  "mackerel",
] as const;

const LANGUAGES = ["malay", "english", "indonesian", "german"] as const;

/**
 * Props of `SeaNameLab`: a shallow Malaysian sea with `animals` (each once)
 * wearing name tags in one of `languages` (each once) at a time. The
 * learner switches the language and the everyday names change while the
 * scientific name stays the same. `labels.names` gives each animal's name in
 * every language shown, and nothing else; the "what it really is" readout
 * shows only when `labels.groups` gives it, so a question can ask first.
 */
function seaNameLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      animals: Schema.NonEmptyArray(Schema.Literals(ANIMALS)).check(
        Schema.isUnique()
      ),
      labels: Schema.Struct({
        animal: TextSchema,
        group: rich,
        groups: Schema.optionalKey(byPickedIds(ANIMALS, rich)),
        language: TextSchema,
        languages: byPickedIds(LANGUAGES, TextSchema),
        names: byPickedIds(ANIMALS, byPickedIds(LANGUAGES, TextSchema)),
        scientific: TextSchema,
        view: TextSchema,
      }),
      languages: Schema.NonEmptyArray(Schema.Literals(LANGUAGES)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ animals, labels, languages }) =>
          namesEach(languages, labels.languages) &&
          namesEach(animals, labels.names) &&
          Arr.every(animals, (animal) => {
            const names = labels.names[animal];
            return names !== undefined && namesEach(languages, names);
          }) &&
          (labels.groups === undefined || namesEach(animals, labels.groups)),
        {
          message:
            "Expected a name for every animal in every language the lab shows, and no other.",
        }
      )
    ),
    answerAt(["labels", "groups"])
  );
}

/**
 * The sea name lab. What each animal really is answers the question the lab
 * raises, so the groups are answer state.
 */
export function vernacularVisuals<E>(rich: RichSlot<E>) {
  return { SeaNameLab: seaNameLab(rich) };
}
