import { QUESTION_BANK_KEY_ROOT } from "@nakafa/aksara-contracts/question/identity";
import { indonesiaTryoutCountry } from "#corpus/tryout/indonesia/country";
import {
  defineTryoutExamSource,
  type TryoutSectionSourceInput,
} from "#corpus/tryout/schema";

const SNBT_SECONDS_PER_QUESTION = 90;
const EXAM_KEY = "snbt";
const QUESTION_ROOT = `${QUESTION_BANK_KEY_ROOT}/${indonesiaTryoutCountry.countryKey}/${EXAM_KEY}`;

type SnbtSection = Omit<
  TryoutSectionSourceInput,
  "order" | "questionSourcePath"
>;

const snbtSections: readonly SnbtSection[] = [
  {
    key: "quantitative-knowledge",
    questionCount: 20,
    rendererDomain: "snbt-quant",
    routeSlugs: {
      en: "quantitative-knowledge",
      id: "pengetahuan-kuantitatif",
    },
    timeLimitSeconds: 20 * SNBT_SECONDS_PER_QUESTION,
    translations: {
      en: { title: "Quantitative Knowledge" },
      id: { title: "Pengetahuan Kuantitatif" },
    },
  },
  {
    key: "mathematical-reasoning",
    questionCount: 20,
    rendererDomain: "snbt-math",
    routeSlugs: {
      en: "mathematical-reasoning",
      id: "penalaran-matematika",
    },
    timeLimitSeconds: 20 * SNBT_SECONDS_PER_QUESTION,
    translations: {
      en: { title: "Mathematical Reasoning" },
      id: { title: "Penalaran Matematika" },
    },
  },
  {
    key: "general-reasoning",
    questionCount: 20,
    rendererDomain: "snbt-general",
    routeSlugs: { en: "general-reasoning", id: "penalaran-umum" },
    timeLimitSeconds: 20 * SNBT_SECONDS_PER_QUESTION,
    translations: {
      en: { title: "General Reasoning" },
      id: { title: "Penalaran Umum" },
    },
  },
  {
    key: "indonesian-language",
    questionCount: 30,
    rendererDomain: "snbt-plain",
    routeSlugs: { en: "indonesian-language", id: "bahasa-indonesia" },
    timeLimitSeconds: 30 * SNBT_SECONDS_PER_QUESTION,
    translations: {
      en: { title: "Indonesian Language" },
      id: { title: "Bahasa Indonesia" },
    },
  },
  {
    key: "english-language",
    questionCount: 20,
    rendererDomain: "snbt-plain",
    routeSlugs: { en: "english-language", id: "bahasa-inggris" },
    timeLimitSeconds: 20 * SNBT_SECONDS_PER_QUESTION,
    translations: {
      en: { title: "English Language" },
      id: { title: "Bahasa Inggris" },
    },
  },
  {
    key: "general-knowledge",
    questionCount: 20,
    rendererDomain: "snbt-plain",
    routeSlugs: { en: "general-knowledge", id: "pengetahuan-umum" },
    timeLimitSeconds: 20 * SNBT_SECONDS_PER_QUESTION,
    translations: {
      en: { title: "General Knowledge" },
      id: { title: "Pengetahuan Umum" },
    },
  },
  {
    key: "reading-and-writing-skills",
    questionCount: 20,
    rendererDomain: "snbt-plain",
    routeSlugs: {
      en: "reading-and-writing-skills",
      id: "literasi-membaca-menulis",
    },
    timeLimitSeconds: 20 * SNBT_SECONDS_PER_QUESTION,
    translations: {
      en: { title: "Reading and Writing Skills" },
      id: { title: "Literasi Membaca dan Menulis" },
    },
  },
];

/** Lazily validates the source-controlled SNBT catalog and placements. */
export const snbtTryoutSource = defineTryoutExamSource({
  ...indonesiaTryoutCountry,
  examKey: EXAM_KEY,
  examOrder: 1,
  examRouteSlugs: { en: "snbt", id: "snbt" },
  examTranslations: {
    en: {
      description: "Indonesian university entrance try-outs.",
      title: "SNBT",
    },
    id: {
      description: "Try out seleksi masuk perguruan tinggi Indonesia.",
      title: "SNBT",
    },
  },
  scoringStrategy: "irt",
  sourceRevision: "2026-07-05",
  tracks: [
    {
      key: "2027",
      kind: "year",
      order: 1,
      routeSlugs: { en: "2027", id: "2027" },
      sets: [1, 2].map((setNumber) => {
        const setKey = `set-${setNumber}`;
        return {
          key: setKey,
          order: setNumber,
          routeSlugs: { en: setKey, id: setKey },
          sections: snbtSections.map((section, sectionIndex) => ({
            ...section,
            order: sectionIndex + 1,
            questionSourcePath: `${QUESTION_ROOT}/${section.key}/${setKey}`,
          })),
          translations: {
            en: { title: `Set ${setNumber}` },
            id: { title: `Set ${setNumber}` },
          },
        };
      }),
      translations: {
        en: { title: "Year 2027" },
        id: { title: "Tahun 2027" },
      },
    },
  ],
});
