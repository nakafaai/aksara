import { TKA_QUESTION_ROOT } from "#corpus/tryout/indonesia/tka/identity";
import type { TryoutTrackSourceInput } from "#corpus/tryout/schema";

/** Active official-format TKA Bahasa Indonesia sets. */
export const tkaIndonesianTrack = {
  key: "indonesian-language",
  kind: "subject",
  order: 2,
  routeSlugs: {
    de: "indonesisch",
    en: "indonesian",
    id: "bahasa-indonesia",
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
          key: "indonesian-language",
          languagePolicy: { kind: "fixed" as const, language: "id" as const },
          order: 1,
          questionCount: 25,
          questionSourcePath: `${TKA_QUESTION_ROOT}/indonesian-language/${setKey}`,
          rendererDomain: "snbt-plain" as const,
          routeSlugs: {
            de: "indonesisch",
            en: "indonesian",
            id: "bahasa-indonesia",
          },
          timeLimitSeconds: 2700,
          translations: {
            de: { title: "Indonesisch" },
            en: { title: "Indonesian" },
            id: { title: "Bahasa Indonesia" },
          },
          visibility: "internal-entry" as const,
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
    de: { title: "Indonesisch" },
    en: { title: "Indonesian" },
    id: { title: "Bahasa Indonesia" },
  },
} satisfies TryoutTrackSourceInput;
