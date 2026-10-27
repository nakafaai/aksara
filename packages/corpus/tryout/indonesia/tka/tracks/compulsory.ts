import { Array as Arr } from "effect";
import type { TrackSourceInput } from "#corpus/tryout/schema";

/** Active official-format TKA Compulsory Mathematics sets. */
export const tkaCompulsoryMathematicsTrack = {
  key: "compulsory-mathematics",
  kind: "subject",
  order: 1,
  profile: {
    names: {
      de: { title: "TKA Pflichtmathematik" },
      en: { title: "TKA Compulsory Mathematics" },
      id: { title: "TKA Matematika Wajib" },
    },
    report: { sections: false, standardError: false, total: true },
    scoring: { kind: "raw" },
    sections: [
      {
        interactions: ["choice", "matrix"],
        items: 25,
        key: "compulsory-mathematics",
        language: "id",
        seconds: 4500,
        translations: {
          de: { title: "Pflichtmathematik" },
          en: { title: "Compulsory Mathematics" },
          id: { title: "Matematika Wajib" },
        },
        visibility: "internal-entry",
      },
    ],
  },
  routeSlugs: {
    de: "pflichtmathematik",
    en: "compulsory-mathematics",
    id: "matematika-wajib",
  },
  sets: Arr.map([1, 2, 3, 4], (setNumber) => {
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
    de: { title: "Pflichtmathematik" },
    en: { title: "Compulsory Mathematics" },
    id: { title: "Matematika Wajib" },
  },
} satisfies TrackSourceInput;
