import { TKA_QUESTION_ROOT } from "#corpus/tryout/indonesia/tka/identity";
import type { TryoutTrackSourceInput } from "#corpus/tryout/schema";

/** Active official-format TKA English sets. */
export const tkaEnglishTrack = {
  key: "english-language",
  kind: "subject",
  order: 3,
  routeSlugs: {
    de: "englisch",
    en: "english",
    id: "bahasa-inggris",
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
          key: "english-language",
          languagePolicy: { kind: "fixed" as const, language: "en" as const },
          order: 1,
          questionCount: 25,
          questionSourcePath: `${TKA_QUESTION_ROOT}/english-language/${setKey}`,
          rendererDomain: "snbt-plain" as const,
          routeSlugs: {
            de: "englisch",
            en: "english",
            id: "bahasa-inggris",
          },
          timeLimitSeconds: 2700,
          translations: {
            de: { title: "Englisch" },
            en: { title: "English" },
            id: { title: "Bahasa Inggris" },
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
    de: { title: "Englisch" },
    en: { title: "English" },
    id: { title: "Bahasa Inggris" },
  },
} satisfies TryoutTrackSourceInput;
