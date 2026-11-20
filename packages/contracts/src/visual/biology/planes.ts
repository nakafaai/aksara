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

const SUBJECTS = ["body", "stem"] as const;

/** The words of a human body: its three planes and the paired direction terms. */
function bodyWords<E>(rich: RichSlot<E>) {
  return {
    pair: Schema.optionalKey(TextSchema),
    pairs: Schema.optionalKey(
      byIds(
        ["vertical", "front", "side", "limb"],
        Schema.Struct({ meaning: rich, name: TextSchema })
      )
    ),
    plane: Schema.optionalKey(TextSchema),
    planes: Schema.optionalKey(
      byIds(
        ["sagittal", "frontal", "transverse"],
        Schema.Struct({ name: TextSchema, separates: rich })
      )
    ),
  };
}

/** The words of a dicot stem: the toggle between its two sections. */
const stemWords = {
  section: Schema.optionalKey(TextSchema),
  sections: Schema.optionalKey(
    byIds(["transverse", "longitudinal"], TextSchema)
  ),
};

/** Checks that some words are all given when their subject is shown, and none otherwise. */
function wordsMatch(shown: boolean, words: readonly unknown[]) {
  return Arr.every(words, (word) => (word !== undefined) === shown);
}

/**
 * Props of `BodyPlanesLab`: a human body in the anatomical position, a dicot
 * stem, or both (`subjects`, each once, in the order the toggle lists them).
 * On the body the learner picks the sagittal, frontal or transverse plane and
 * slides its cut, and the readouts name the plane, which parts it separates
 * and the paired direction terms (superior and inferior, anterior and
 * posterior, medial and lateral, proximal and distal). On the stem the
 * learner switches between a transverse and a longitudinal section. Each
 * subject's words are given exactly when that subject is shown.
 */
function bodyPlanesLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        ...bodyWords(rich),
        ...stemWords,
        position: TextSchema,
        subject: TextSchema,
        subjects: byPickedIds(SUBJECTS, TextSchema),
        view: TextSchema,
      }),
      subjects: Schema.NonEmptyArray(Schema.Literals(SUBJECTS)).check(
        Schema.isUnique()
      ),
    }).check(
      Schema.makeFilter(
        ({ labels, subjects }) =>
          namesEach(subjects, labels.subjects) &&
          wordsMatch(Arr.contains(subjects, "body"), [
            labels.pair,
            labels.pairs,
            labels.plane,
            labels.planes,
          ]) &&
          wordsMatch(Arr.contains(subjects, "stem"), [
            labels.section,
            labels.sections,
          ]),
        {
          message:
            "Expected a name for every subject shown, the planes and direction terms exactly when the body is shown, and the sections exactly when the stem is shown.",
        }
      )
    )
  );
}

/** The body planes lab. Every prop names what the learner explores; none is answer state. */
export function planesVisuals<E>(rich: RichSlot<E>) {
  return { BodyPlanesLab: bodyPlanesLab(rich) };
}
