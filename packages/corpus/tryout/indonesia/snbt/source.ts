import { QUESTION_BANK_KEY_ROOT } from "@nakafa/aksara-contracts/question/identity";
import { Array as Arr, Effect } from "effect";
import { indonesiaTryoutCountry } from "#corpus/tryout/indonesia/country";
import { snbtReadiness } from "#corpus/tryout/indonesia/snbt/readiness";
import { validateAssessmentSourceReadiness } from "#corpus/tryout/readiness/validation";
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
    languagePolicy: { kind: "fixed", language: "id" },
    questionCount: 30,
    rendererDomain: "snbt-general",
    routeSlugs: {
      de: "allgemeines-schlussfolgern",
      en: "general-reasoning",
      id: "penalaran-umum",
    },
    timeLimitSeconds: 1800,
    translations: {
      de: { title: "Allgemeines Schlussfolgern" },
      en: { title: "General Reasoning" },
      id: { title: "Penalaran Umum" },
    },
  },
  {
    key: "general-knowledge-and-understanding",
    languagePolicy: { kind: "fixed", language: "id" },
    questionCount: 20,
    rendererDomain: "snbt-plain",
    routeSlugs: {
      de: "allgemeines-wissen-und-verstaendnis",
      en: "general-knowledge-and-understanding",
      id: "pengetahuan-dan-pemahaman-umum",
    },
    timeLimitSeconds: 900,
    translations: {
      de: { title: "Allgemeines Wissen und Verständnis" },
      en: { title: "General Knowledge and Understanding" },
      id: { title: "Pengetahuan dan Pemahaman Umum" },
    },
  },
  {
    key: "reading-comprehension-and-writing",
    languagePolicy: { kind: "fixed", language: "id" },
    questionCount: 20,
    rendererDomain: "snbt-plain",
    routeSlugs: {
      de: "leseverstaendnis-und-schreiben",
      en: "reading-comprehension-and-writing",
      id: "pemahaman-bacaan-dan-menulis",
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
    languagePolicy: { kind: "fixed", language: "id" },
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
    key: "literacy-in-indonesian",
    languagePolicy: { kind: "fixed", language: "id" },
    questionCount: 30,
    rendererDomain: "snbt-plain",
    routeSlugs: {
      de: "lesekompetenz-in-indonesischer-sprache",
      en: "literacy-in-indonesian",
      id: "literasi-dalam-bahasa-indonesia",
    },
    timeLimitSeconds: 2550,
    translations: {
      de: { title: "Lesekompetenz in indonesischer Sprache" },
      en: { title: "Literacy in Indonesian" },
      id: { title: "Literasi dalam Bahasa Indonesia" },
    },
  },
  {
    key: "literacy-in-english",
    languagePolicy: { kind: "fixed", language: "en" },
    questionCount: 20,
    rendererDomain: "snbt-plain",
    routeSlugs: {
      de: "lesekompetenz-in-englischer-sprache",
      en: "literacy-in-english",
      id: "literasi-dalam-bahasa-inggris",
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
    languagePolicy: { kind: "fixed", language: "id" },
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
  sourceRevision: "2026-10-02",
  tracks: [
    {
      key: "2027",
      kind: "year",
      order: 1,
      routeSlugs: { de: "2027", en: "2027", id: "2027" },
      sets: Arr.map([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (setNumber) => {
        const setKey = `set-${setNumber}`;
        return {
          key: setKey,
          order: setNumber,
          routeSlugs: {
            de: `aufgabensatz-${setNumber}`,
            en: setKey,
            id: setKey,
          },
          sections: Arr.map(snbtSections, (section, sectionIndex) => ({
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
