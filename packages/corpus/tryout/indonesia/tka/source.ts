import { QUESTION_BANK_KEY_ROOT } from "@nakafa/aksara-contracts/question/identity";
import { indonesiaTryoutCountry } from "#corpus/tryout/indonesia/country";
import { defineTryoutExamSource } from "#corpus/tryout/schema";

const TKA_SECONDS_PER_QUESTION = 90;
const EXAM_KEY = "tka";
const QUESTION_ROOT = `${QUESTION_BANK_KEY_ROOT}/${indonesiaTryoutCountry.countryKey}/${EXAM_KEY}`;

/** Lazily validates the source-controlled TKA catalog and placements. */
export const tkaTryoutSource = defineTryoutExamSource({
  ...indonesiaTryoutCountry,
  examKey: EXAM_KEY,
  examOrder: 2,
  examRouteSlugs: { de: "tka", en: "tka", id: "tka" },
  examTranslations: {
    de: {
      description:
        "Probetest für den indonesischen akademischen Kompetenztest.",
      title: "TKA",
    },
    en: {
      description: "Indonesian academic competency try-outs.",
      title: "TKA",
    },
    id: {
      description: "Try out Tes Kemampuan Akademik Indonesia.",
      title: "TKA",
    },
  },
  scoringStrategy: "raw",
  sourceRevision: "2026-07-05",
  tracks: [
    {
      key: "mathematics",
      kind: "subject",
      order: 1,
      routeSlugs: {
        de: "mathematik",
        en: "mathematics",
        id: "matematika",
      },
      sets: [1, 2, 3].map((setNumber) => {
        const setKey = `set-${setNumber}`;
        return {
          key: setKey,
          order: setNumber,
          routeSlugs: {
            de: `aufgabensatz-${setNumber}`,
            en: setKey,
            id: setKey,
          },
          sections: [
            {
              key: "mathematics",
              order: 1,
              questionCount: 40,
              questionSourcePath: `${QUESTION_ROOT}/mathematics/${setKey}`,
              rendererDomain: "tka-math",
              routeSlugs: {
                de: "mathematik",
                en: "mathematics",
                id: "matematika",
              },
              timeLimitSeconds: 40 * TKA_SECONDS_PER_QUESTION,
              translations: {
                de: { title: "Mathematik" },
                en: { title: "Mathematics" },
                id: { title: "Matematika" },
              },
              visibility: "internal-entry",
            },
          ],
          translations: {
            de: { title: `Aufgabensatz ${setNumber}` },
            en: { title: `Set ${setNumber}` },
            id: { title: `Set ${setNumber}` },
          },
        };
      }),
      translations: {
        de: { title: "Mathematik" },
        en: { title: "Mathematics" },
        id: { title: "Matematika" },
      },
    },
  ],
});
