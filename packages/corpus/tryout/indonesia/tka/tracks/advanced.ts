import { Array as Arr } from "effect";
import type { TrackSourceInput } from "#corpus/tryout/schema";

/** Active official-format TKA Advanced Mathematics sets, an elective subject. */
export const tkaAdvancedMathematicsTrack = {
  group: "senior-high-school",
  key: "advanced-mathematics",
  order: 4,
  profile: {
    names: {
      de: { title: "TKA Fortgeschrittene Mathematik" },
      en: { title: "TKA Advanced Mathematics" },
      id: { title: "TKA Matematika Tingkat Lanjut" },
    },
    report: { sections: false, standardError: false, total: true },
    scoring: { kind: "raw" },
    sections: [
      {
        interactions: ["choice", "matrix"],
        items: 25,
        key: "advanced-mathematics",
        language: "id",
        seconds: 3600,
        translations: {
          de: { title: "Fortgeschrittene Mathematik" },
          en: { title: "Advanced Mathematics" },
          id: { title: "Matematika Tingkat Lanjut" },
        },
        visibility: "internal-entry",
      },
    ],
  },
  routeSlugs: {
    de: "fortgeschrittene-mathematik",
    en: "advanced-mathematics",
    id: "matematika-tingkat-lanjut",
  },
  sets: Arr.map([1], (setNumber) => {
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
    de: { title: "Fortgeschrittene Mathematik" },
    en: { title: "Advanced Mathematics" },
    id: { title: "Matematika Tingkat Lanjut" },
  },
} satisfies TrackSourceInput;
