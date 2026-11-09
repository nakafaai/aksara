import { Array as Arr, Effect } from "effect";
import { indonesiaTryoutCountry } from "#corpus/tryout/indonesia/country";
import { snbtReadiness } from "#corpus/tryout/indonesia/snbt/readiness";
import { validateAssessmentSourceReadiness } from "#corpus/tryout/readiness/validation";
import {
  defineExamSource,
  type SectionSourceInput,
} from "#corpus/tryout/schema";

const snbtSections: Arr.NonEmptyReadonlyArray<SectionSourceInput> = [
  {
    interactions: ["choice", "matrix", "numericEntry"],
    items: 30,
    key: "general-reasoning",
    language: "id",
    routeSlugs: {
      de: "allgemeines-schlussfolgern",
      en: "general-reasoning",
      id: "penalaran-umum",
    },
    seconds: 1800,
    translations: {
      de: { title: "Allgemeines Schlussfolgern" },
      en: { title: "General Reasoning" },
      id: { title: "Penalaran Umum" },
    },
    visibility: "visible",
  },
  {
    interactions: ["choice", "matrix"],
    items: 20,
    key: "general-knowledge-and-understanding",
    language: "id",
    routeSlugs: {
      de: "allgemeines-wissen-und-verstaendnis",
      en: "general-knowledge-and-understanding",
      id: "pengetahuan-dan-pemahaman-umum",
    },
    seconds: 900,
    translations: {
      de: { title: "Allgemeines Wissen und Verständnis" },
      en: { title: "General Knowledge and Understanding" },
      id: { title: "Pengetahuan dan Pemahaman Umum" },
    },
    visibility: "visible",
  },
  {
    interactions: ["choice", "matrix"],
    items: 20,
    key: "reading-comprehension-and-writing",
    language: "id",
    routeSlugs: {
      de: "leseverstaendnis-und-schreiben",
      en: "reading-comprehension-and-writing",
      id: "pemahaman-bacaan-dan-menulis",
    },
    seconds: 1500,
    translations: {
      de: { title: "Leseverständnis und Schreiben" },
      en: { title: "Reading Comprehension and Writing" },
      id: { title: "Pemahaman Bacaan dan Menulis" },
    },
    visibility: "visible",
  },
  {
    interactions: ["choice", "matrix", "numericEntry"],
    items: 20,
    key: "quantitative-knowledge",
    language: "id",
    routeSlugs: {
      de: "quantitatives-wissen",
      en: "quantitative-knowledge",
      id: "pengetahuan-kuantitatif",
    },
    seconds: 1200,
    translations: {
      de: { title: "Quantitatives Wissen" },
      en: { title: "Quantitative Knowledge" },
      id: { title: "Pengetahuan Kuantitatif" },
    },
    visibility: "visible",
  },
  {
    interactions: ["choice", "matrix"],
    items: 30,
    key: "literacy-in-indonesian",
    language: "id",
    routeSlugs: {
      de: "lesekompetenz-in-indonesischer-sprache",
      en: "literacy-in-indonesian",
      id: "literasi-dalam-bahasa-indonesia",
    },
    seconds: 2550,
    translations: {
      de: { title: "Lesekompetenz in indonesischer Sprache" },
      en: { title: "Literacy in Indonesian" },
      id: { title: "Literasi dalam Bahasa Indonesia" },
    },
    visibility: "visible",
  },
  {
    interactions: ["choice", "matrix"],
    items: 20,
    key: "literacy-in-english",
    language: "en",
    routeSlugs: {
      de: "lesekompetenz-in-englischer-sprache",
      en: "literacy-in-english",
      id: "literasi-dalam-bahasa-inggris",
    },
    seconds: 1200,
    translations: {
      de: { title: "Lesekompetenz in englischer Sprache" },
      en: { title: "Literacy in English" },
      id: { title: "Literasi dalam Bahasa Inggris" },
    },
    visibility: "visible",
  },
  {
    interactions: ["choice", "matrix", "numericEntry"],
    items: 20,
    key: "mathematical-reasoning",
    language: "id",
    routeSlugs: {
      de: "mathematisches-schlussfolgern",
      en: "mathematical-reasoning",
      id: "penalaran-matematika",
    },
    seconds: 2550,
    translations: {
      de: { title: "Mathematisches Schlussfolgern" },
      en: { title: "Mathematical Reasoning" },
      id: { title: "Penalaran Matematika" },
    },
    visibility: "visible",
  },
];

/**
 * SNBT, grouped by the year of its sitting. Learners prepare for the next
 * sitting, so the one group is 2027. Its UTBK keeps the year as its track key,
 * which every attempt, score, and scale of it already holds.
 */
const snbtTryoutCatalog = defineExamSource({
  ...indonesiaTryoutCountry,
  examKey: "snbt",
  examName: "SNBT",
  examOrder: 1,
  examRouteSlugs: { de: "snbt", en: "snbt", id: "snbt" },
  examTranslations: {
    de: {
      description:
        "Probetest für das indonesische Auswahlverfahren zur Hochschulzulassung.",
    },
    en: {
      description: "Indonesian university entrance try-outs.",
    },
    id: {
      description: "Try out seleksi masuk perguruan tinggi Indonesia.",
    },
  },
  grouping: {
    axis: "year",
    groups: [
      {
        key: "2027",
        order: 1,
        routeSlugs: { de: "2027", en: "2027", id: "2027" },
        translations: {
          de: { title: "2027" },
          en: { title: "2027" },
          id: { title: "2027" },
        },
      },
    ],
  },
  sourceRevision: "2026-10-02",
  tracks: [
    {
      group: "2027",
      key: "2027",
      order: 1,
      profile: {
        names: {
          de: { title: "UTBK-SNBT" },
          en: { title: "UTBK-SNBT" },
          id: { title: "UTBK-SNBT" },
        },
        report: { sections: true, standardError: true, total: true },
        scale: { maximum: 1000, minimum: 0 },
        scoring: { kind: "irt" },
        sections: snbtSections,
      },
      routeSlugs: { de: "utbk", en: "utbk", id: "utbk" },
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
          translations: {
            de: { title: `Aufgabensatz ${setNumber}` },
            en: { title: `Set ${setNumber}` },
            id: { title: `Set ${setNumber}` },
          },
        };
      }),
      translations: {
        de: { title: "UTBK" },
        en: { title: "UTBK" },
        id: { title: "UTBK" },
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
