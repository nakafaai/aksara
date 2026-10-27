import type { ItemSource } from "#corpus/question-bank/item";
import { SetPathSchema } from "#corpus/question-bank/path";
import { questionFiles, TEST_ITEM } from "#corpus/test/bank";
import {
  defineExamSource,
  type ExamSourceInput,
  type SectionSourceInput,
  type TrackSourceInput,
} from "#corpus/tryout/schema";

/** One title in every app locale, so each route spells it in each locale. */
export function titled(title: string) {
  return { de: { title }, en: { title }, id: { title } };
}

/** One route slug in every app locale. */
export function slugged(slug: string) {
  return { de: slug, en: slug, id: slug };
}

/** One set of a test track, named and routed as `Set <n>`. */
export function testSet(number: number) {
  return {
    key: `set-${number}`,
    order: number,
    routeSlugs: slugged(`set-${number}`),
    translations: titled(`Set ${number}`),
  };
}

/** The one section of the subject track, entered from its set. */
export const testSubjectSection: SectionSourceInput = {
  interactions: ["choice", "matrix"],
  items: 2,
  key: "test-subject",
  language: "id",
  seconds: 600,
  translations: titled("Test Subject"),
  visibility: "internal-entry",
};

/** The first section of the year track, asked in Indonesian. */
export const testReasoningSection: SectionSourceInput = {
  interactions: ["choice"],
  items: 1,
  key: "test-reasoning",
  language: "id",
  routeSlugs: slugged("test-reasoning"),
  seconds: 300,
  translations: titled("Test Reasoning"),
  visibility: "visible",
};

/** The second section of the year track, asked in English. */
export const testEnglishSection: SectionSourceInput = {
  interactions: ["choice"],
  items: 1,
  key: "test-english",
  language: "en",
  routeSlugs: slugged("test-english"),
  seconds: 240,
  translations: titled("Test English"),
  visibility: "visible",
};

/** A subject track scored raw, with one section entered from its set. */
export const testSubjectTrack: TrackSourceInput = {
  key: "test-subject",
  kind: "subject",
  order: 1,
  profile: {
    names: titled("Test Subject Exam"),
    report: { sections: false, standardError: false, total: true },
    scoring: { kind: "raw" },
    sections: [testSubjectSection],
  },
  routeSlugs: slugged("test-subject"),
  sets: [testSet(1)],
  translations: titled("Test Subject"),
};

/** A year track scored by IRT with two visible sections. */
export const testYearTrack: TrackSourceInput = {
  key: "2027",
  kind: "year",
  order: 2,
  profile: {
    names: titled("Test Year Exam"),
    report: { sections: true, standardError: true, total: true },
    scale: { maximum: 1000, minimum: 0 },
    scoring: { kind: "irt" },
    sections: [testReasoningSection, testEnglishSection],
  },
  routeSlugs: slugged("2027"),
  sets: [testSet(1)],
  translations: titled("Year 2027"),
};

/** The test exam: the subject track and the year track. */
export const testExamInput: ExamSourceInput = {
  countryCode: "ZZ",
  countryKey: "test-country",
  countryOrder: 1,
  countryRevision: "2026-10-26",
  countryRouteSlugs: slugged("test-country"),
  countryTranslations: titled("Test Country"),
  examKey: "test-exam",
  examOrder: 1,
  examRouteSlugs: slugged("test-exam"),
  examTranslations: titled("Test Exam"),
  sourceRevision: "2026-10-26",
  tracks: [testSubjectTrack, testYearTrack],
};

/** The decoded test exam. */
export const testExam = defineExamSource(testExamInput);

/** The bank set of one section of the first set of the test exam. */
export function testSectionSet(sectionKey: string) {
  return SetPathSchema.make(`test-country/test-exam/${sectionKey}/set-1`);
}

const english: ItemSource = { versions: { en: TEST_ITEM.versions.id } };

/** The files of a complete question bank for the test exam. */
export const testExamFiles = [
  ...questionFiles(1, TEST_ITEM, "Soal satu.", testSectionSet("test-subject")),
  ...questionFiles(
    2,
    {
      versions: {
        id: {
          columns: ["Benar", "Salah"],
          kind: "matrix",
          statements: [{ column: 1, label: "Satu sama dengan satu." }],
        },
      },
    },
    "Tentukan benar atau salah.",
    testSectionSet("test-subject")
  ),
  ...questionFiles(
    1,
    TEST_ITEM,
    "Soal penalaran.",
    testSectionSet("test-reasoning")
  ),
  ...questionFiles(
    1,
    english,
    "An English task.",
    testSectionSet("test-english")
  ),
];
