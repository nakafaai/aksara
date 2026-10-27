import { Array as Arr } from "effect";
import type { TrackSourceInput } from "#corpus/tryout/schema";

/** Active official-format TKA Bahasa Indonesia sets. */
export const tkaIndonesianTrack = {
  key: "indonesian-language",
  kind: "subject",
  order: 2,
  profile: {
    names: {
      de: { title: "TKA Indonesisch" },
      en: { title: "TKA Indonesian" },
      id: { title: "TKA Bahasa Indonesia" },
    },
    report: { sections: false, standardError: false, total: true },
    scoring: { kind: "raw" },
    sections: [
      {
        interactions: ["choice", "matrix"],
        items: 25,
        key: "indonesian-language",
        language: "id",
        seconds: 4500,
        translations: {
          de: { title: "Indonesisch" },
          en: { title: "Indonesian" },
          id: { title: "Bahasa Indonesia" },
        },
        visibility: "internal-entry",
      },
    ],
  },
  routeSlugs: {
    de: "indonesisch",
    en: "indonesian",
    id: "bahasa-indonesia",
  },
  sets: Arr.map([1, 2, 3], (setNumber) => {
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
    de: { title: "Indonesisch" },
    en: { title: "Indonesian" },
    id: { title: "Bahasa Indonesia" },
  },
} satisfies TrackSourceInput;
