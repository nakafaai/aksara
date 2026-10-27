import { KebabKeySchema } from "@nakafa/aksara-contracts/assessment/identity";
import { AppLocaleCodeSchema } from "@nakafa/aksara-contracts/locale";
import { Array as Arr, Effect, Option, Result, Schema } from "effect";
import { itemVersions } from "#corpus/question-bank/item";
import {
  type SetPath,
  SetPathSchema,
  setPath,
} from "#corpus/question-bank/path";
import {
  type QuestionSet,
  QuestionSetSchema,
} from "#corpus/question-bank/source";
import { paperId } from "#corpus/tryout/exam";
import { profileId } from "#corpus/tryout/profile";
import type {
  ExamSource,
  SectionSource,
  SetSource,
  TrackSource,
} from "#corpus/tryout/schema";

/** One section of a planned paper: the bank set it places, in the section's language. */
const PlannedSectionSchema = Schema.Struct({
  key: KebabKeySchema,
  language: AppLocaleCodeSchema,
  set: QuestionSetSchema,
});

/**
 * The plan of one paper: the exam, track, and set it belongs to, the profile
 * it follows, and for each section of the profile the questions it places.
 */
export const PaperPlanSchema = Schema.Struct({
  examKey: KebabKeySchema,
  id: Schema.String,
  profile: Schema.String,
  sections: Schema.Array(PlannedSectionSchema),
  setKey: KebabKeySchema,
  trackKey: KebabKeySchema,
});
export type PaperPlan = typeof PaperPlanSchema.Type;

/** A section of a set does not place what its profile asks for. */
export class PaperPlanError extends Schema.TaggedError<
  PaperPlanError,
  { readonly brand: unique symbol }
>()("PaperPlanError", {
  reason: Schema.Literals(["items", "language", "missing"]),
  set: SetPathSchema,
}) {}

/** A shared reading is used by one question alone, or by questions that do not follow each other. */
export class StimulusGroupError extends Schema.TaggedError<
  StimulusGroupError,
  { readonly brand: unique symbol }
>()("StimulusGroupError", {
  key: KebabKeySchema,
  reason: Schema.Literals(["isolated", "noncontiguous"]),
  set: SetPathSchema,
}) {}

/** The bank set that fills one section of one set of an exam. */
function sectionSet(
  exam: ExamSource,
  section: SectionSource,
  set: SetSource
): SetPath {
  return setPath({
    countryKey: exam.countryKey,
    examKey: exam.examKey,
    sectionKey: section.key,
    setKey: set.key,
  });
}

/** Every bank set that an active exam sits, in source order. */
export function examSetPaths(exams: readonly ExamSource[]) {
  return Arr.flatMap(exams, (exam) =>
    Arr.flatMap(exam.tracks, (track) =>
      Arr.flatMap(track.sets, (set) =>
        Arr.map(track.profile.sections, (section) =>
          sectionSet(exam, section, set)
        )
      )
    )
  );
}

/**
 * Requires every shared reading of a section to be used by two questions or
 * more that follow each other, so a learner reads one passage once, beside
 * all of its questions.
 */
const requireStimulusGroups = Effect.fn("AksaraCorpus.requireStimulusGroups")(
  function* (set: QuestionSet) {
    const keys = Arr.map(set.questions, ({ item }) => item.stimulus);
    for (const stimulus of set.stimuli) {
      const places = Arr.filterMap(keys, (key, index) =>
        key === stimulus.key ? Result.succeed(index) : Result.failVoid
      );
      if (places.length < 2) {
        return yield* new StimulusGroupError({
          key: stimulus.key,
          reason: "isolated",
          set: set.path,
        });
      }
      if (
        Arr.some(
          Arr.zip(places, Arr.drop(places, 1)),
          ([place, next]) => next !== place + 1
        )
      ) {
        return yield* new StimulusGroupError({
          key: stimulus.key,
          reason: "noncontiguous",
          set: set.path,
        });
      }
    }
  }
);

/** Plans one section: its bank set, with exactly its items, each asked in its language. */
const planSection = Effect.fn("AksaraCorpus.planSection")(function* (
  exam: ExamSource,
  section: SectionSource,
  set: SetSource,
  sets: readonly QuestionSet[]
) {
  const path = sectionSet(exam, section, set);
  const found = Arr.findFirst(sets, (candidate) => candidate.path === path);
  if (Option.isNone(found)) {
    return yield* new PaperPlanError({ reason: "missing", set: path });
  }
  const { questions } = found.value;
  if (questions.length !== section.items) {
    return yield* new PaperPlanError({ reason: "items", set: path });
  }
  if (
    !Arr.every(questions, ({ item }) =>
      Arr.some(
        itemVersions(item.versions),
        ({ language }) => language === section.language
      )
    )
  ) {
    return yield* new PaperPlanError({ reason: "language", set: path });
  }
  yield* requireStimulusGroups(found.value);
  return { key: section.key, language: section.language, set: found.value };
});

/** Plans the paper of one set of a track. */
const planPaper = Effect.fn("AksaraCorpus.planPaper")(function* (
  exam: ExamSource,
  track: TrackSource,
  set: SetSource,
  sets: readonly QuestionSet[]
) {
  const sections = yield* Effect.forEach(track.profile.sections, (section) =>
    planSection(exam, section, set, sets)
  );
  const profile = profileId(exam, track);
  return PaperPlanSchema.make({
    examKey: exam.examKey,
    id: paperId(exam, track, set),
    profile,
    sections,
    setKey: set.key,
    trackKey: track.key,
  });
});

/** Plans the paper of every set of every active exam. */
export const planTryoutPapers = Effect.fn("AksaraCorpus.planTryoutPapers")(
  function* (exams: readonly ExamSource[], sets: readonly QuestionSet[]) {
    return yield* Effect.forEach(
      Arr.flatMap(exams, (exam) =>
        Arr.flatMap(exam.tracks, (track) =>
          Arr.map(track.sets, (set) => ({ exam, set, track }))
        )
      ),
      ({ exam, set, track }) => planPaper(exam, track, set, sets)
    );
  }
);
