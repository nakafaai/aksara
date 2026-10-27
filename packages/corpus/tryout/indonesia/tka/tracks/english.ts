import { Array as Arr } from "effect";
import type { TrackSourceInput } from "#corpus/tryout/schema";

/** Active official-format TKA English sets. */
export const tkaEnglishTrack = {
  key: "english-language",
  kind: "subject",
  order: 3,
  profile: {
    names: {
      de: { title: "TKA Englisch" },
      en: { title: "TKA English" },
      id: { title: "TKA Bahasa Inggris" },
    },
    report: { sections: false, standardError: false, total: true },
    scoring: { kind: "raw" },
    sections: [
      {
        interactions: ["choice", "matrix"],
        items: 25,
        key: "english-language",
        language: "en",
        seconds: 4500,
        translations: {
          de: { title: "Englisch" },
          en: { title: "English" },
          id: { title: "Bahasa Inggris" },
        },
        visibility: "internal-entry",
      },
    ],
  },
  routeSlugs: {
    de: "englisch",
    en: "english",
    id: "bahasa-inggris",
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
    de: { title: "Englisch" },
    en: { title: "English" },
    id: { title: "Bahasa Inggris" },
  },
} satisfies TrackSourceInput;
