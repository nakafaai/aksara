import { QUESTION_BANK_KEY_ROOT } from "@nakafa/aksara-contracts/question/identity";
import { Effect } from "effect";
import { indonesiaTryoutCountry } from "#corpus/tryout/indonesia/country";
import { snbtReadiness } from "#corpus/tryout/indonesia/snbt/readiness";
import { validateAssessmentSourceReadiness } from "#corpus/tryout/readiness/schema";
import {
  defineTryoutExamSource,
  type TryoutSectionSourceInput,
} from "#corpus/tryout/schema";

const EXAM_KEY = "snbt";
const QUESTION_ROOT = `${QUESTION_BANK_KEY_ROOT}/${indonesiaTryoutCountry.countryKey}/${EXAM_KEY}`;

type SnbtSection = Omit<
  TryoutSectionSourceInput,
  "order" | "questionSourcePath"
>;

const snbtSections: readonly SnbtSection[] = [
  {
    key: "general-reasoning",
    languagePolicy: { kind: "app-locale" },
    questionCount: 30,
    rendererDomain: "snbt-general",
    routeSlugs: {
      de: "allgemeines-logisches-denken",
      en: "general-reasoning",
      id: "penalaran-umum",
    },
    timeLimitSeconds: 1800,
    translations: {
      de: { title: "Allgemeines logisches Denken" },
      en: { title: "General Reasoning" },
      id: { title: "Penalaran Umum" },
    },
  },
  {
    key: "general-knowledge",
    languagePolicy: { kind: "app-locale" },
    questionCount: 20,
    rendererDomain: "snbt-plain",
    routeSlugs: {
      de: "allgemeinwissen",
      en: "general-knowledge",
      id: "pengetahuan-umum",
    },
    timeLimitSeconds: 900,
    translations: {
      de: { title: "Allgemeines Wissen und Verständnis" },
      en: { title: "General Knowledge and Understanding" },
      id: { title: "Pengetahuan dan Pemahaman Umum" },
    },
  },
  {
    key: "reading-and-writing-skills",
    languagePolicy: { kind: "app-locale" },
    questionCount: 20,
    rendererDomain: "snbt-plain",
    routeSlugs: {
      de: "lese-und-schreibkompetenz",
      en: "reading-and-writing-skills",
      id: "literasi-membaca-menulis",
    },
    timeLimitSeconds: 1500,
    translations: {
      de: { title: "Leseverständnis und Schreiben" },
      en: { title: "Reading Comprehension and Writing" },
      id: { title: "Pemahaman Bacaan dan Menulis" },
    },
  },
  {
    key: "quantitative-knowledge",
    languagePolicy: { kind: "app-locale" },
    questionCount: 20,
    rendererDomain: "snbt-quant",
    routeSlugs: {
      de: "quantitatives-wissen",
      en: "quantitative-knowledge",
      id: "pengetahuan-kuantitatif",
    },
    timeLimitSeconds: 1200,
    translations: {
      de: { title: "Quantitatives Wissen" },
      en: { title: "Quantitative Knowledge" },
      id: { title: "Pengetahuan Kuantitatif" },
    },
  },
  {
    key: "indonesian-language",
    languagePolicy: { kind: "fixed", language: "id" },
    questionCount: 30,
    rendererDomain: "snbt-plain",
    routeSlugs: {
      de: "indonesische-sprache",
      en: "indonesian-language",
      id: "bahasa-indonesia",
    },
    timeLimitSeconds: 2550,
    translations: {
      de: { title: "Lesekompetenz in indonesischer Sprache" },
      en: { title: "Literacy in Indonesian" },
      id: { title: "Literasi dalam Bahasa Indonesia" },
    },
  },
  {
    key: "english-language",
    languagePolicy: { kind: "fixed", language: "en" },
    questionCount: 20,
    rendererDomain: "snbt-plain",
    routeSlugs: {
      de: "englische-sprache",
      en: "english-language",
      id: "bahasa-inggris",
    },
    timeLimitSeconds: 1200,
    translations: {
      de: { title: "Lesekompetenz in englischer Sprache" },
      en: { title: "Literacy in English" },
      id: { title: "Literasi dalam Bahasa Inggris" },
    },
  },
  {
    key: "mathematical-reasoning",
    languagePolicy: { kind: "app-locale" },
    questionCount: 20,
    rendererDomain: "snbt-math",
    routeSlugs: {
      de: "mathematisches-schlussfolgern",
      en: "mathematical-reasoning",
      id: "penalaran-matematika",
    },
    timeLimitSeconds: 2550,
    translations: {
      de: { title: "Mathematisches Schlussfolgern" },
      en: { title: "Mathematical Reasoning" },
      id: { title: "Penalaran Matematika" },
    },
  },
];

const snbtTryoutCatalog = defineTryoutExamSource({
  ...indonesiaTryoutCountry,
  examKey: EXAM_KEY,
  examOrder: 1,
  examRouteSlugs: { de: "snbt", en: "snbt", id: "snbt" },
  examTranslations: {
    de: {
      description:
        "Probetest für das indonesische Auswahlverfahren zur Hochschulzulassung.",
      title: "SNBT",
    },
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
  sourceRevision: "2026-08-30",
  tracks: [
    {
      key: "2027",
      kind: "year",
      order: 1,
      routeSlugs: { de: "2027", en: "2027", id: "2027" },
      sets: [1, 2].map((setNumber) => {
        const setKey = `set-${setNumber}`;
        return {
          key: setKey,
          order: setNumber,
          routeSlugs: {
            de: `aufgabensatz-${setNumber}`,
            en: setKey,
            id: setKey,
          },
          sections: snbtSections.map((section, sectionIndex) => ({
            ...section,
            order: sectionIndex + 1,
            questionSourcePath: `${QUESTION_ROOT}/${section.key}/${setKey}`,
          })),
          translations: {
            de: { title: `Aufgabensatz ${setNumber}` },
            en: { title: `Set ${setNumber}` },
            id: { title: `Set ${setNumber}` },
          },
        };
      }),
      translations: {
        de: { title: "Jahr 2027" },
        en: { title: "Year 2027" },
        id: { title: "Tahun 2027" },
      },
    },
  ],
});

/** Validates the active SNBT catalog against its latest official readiness. */
export const snbtTryoutSource = Effect.gen(function* () {
  const [source, readiness] = yield* Effect.all([
    snbtTryoutCatalog,
    snbtReadiness,
  ]);
  return yield* validateAssessmentSourceReadiness(source, readiness);
});
