import { Array as Arr } from "effect";
import type { TrackSourceInput } from "#corpus/tryout/schema";

/** Active official-format TKA Compulsory Mathematics sets. */
export const tkaCompulsoryMathematicsTrack = {
  group: "senior-high-school",
  key: "compulsory-mathematics",
  order: 1,
  profile: {
    names: {
      de: { title: "TKA Pflichtmathematik" },
      en: { title: "TKA Compulsory Mathematics" },
      id: { title: "TKA Matematika Wajib" },
      ms: { title: "TKA Matematik Wajib" },
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
          ms: { title: "Matematik Wajib" },
        },
        visibility: "internal-entry",
      },
    ],
  },
  routeSlugs: {
    de: "pflichtmathematik",
    en: "compulsory-mathematics",
    id: "matematika-wajib",
    ms: "matematik-wajib",
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
        ms: setKey,
      },
      translations: {
        de: { title: `Aufgabensatz ${setNumber}` },
        en: { title: `Set ${setNumber}` },
        id: { title: `Set ${setNumber}` },
        ms: { title: `Set ${setNumber}` },
      },
    };
  }),
  translations: {
    de: { title: "Pflichtmathematik" },
    en: { title: "Compulsory Mathematics" },
    id: { title: "Matematika Wajib" },
    ms: { title: "Matematik Wajib" },
  },
} satisfies TrackSourceInput;
