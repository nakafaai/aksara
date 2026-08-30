import { TKA_QUESTION_ROOT } from "#corpus/tryout/indonesia/tka/identity";
import type { TryoutTrackSourceInput } from "#corpus/tryout/schema";

/** Active official-format TKA Mathematics sets. */
export const tkaMathematicsTrack = {
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
          languagePolicy: { kind: "app-locale" as const },
          order: 1,
          questionCount: 25,
          questionSourcePath: `${TKA_QUESTION_ROOT}/mathematics/${setKey}`,
          rendererDomain: "tka-math" as const,
          routeSlugs: {
            de: "mathematik",
            en: "mathematics",
            id: "matematika",
          },
          timeLimitSeconds: 3000,
          translations: {
            de: { title: "Mathematik" },
            en: { title: "Mathematics" },
            id: { title: "Matematika" },
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
    de: { title: "Mathematik" },
    en: { title: "Mathematics" },
    id: { title: "Matematika" },
  },
} satisfies TryoutTrackSourceInput;
