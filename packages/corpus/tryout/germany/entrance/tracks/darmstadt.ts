import { Array as Arr } from "effect";
import type { TrackSourceInput } from "#corpus/tryout/schema";

/**
 * The mathematics test of the entrance examination at the Studienkolleg of TU
 * Darmstadt, taken by applicants for the T course: single choice with six
 * options, as the Kolleg's published sample shows. It sits in the Kolleg's
 * group.
 */
export const tuDarmstadtEntranceTrack = {
  group: "tu-darmstadt",
  key: "tu-darmstadt-mathematics",
  order: 1,
  profile: {
    names: {
      de: { title: "Mathematiktest im Aufnahmeverfahren der TU Darmstadt" },
      en: {
        title: "TU Darmstadt Entrance Examination, Mathematics Test",
      },
      id: { title: "Tes Matematika Ujian Masuk TU Darmstadt" },
    },
    report: { sections: false, standardError: false, total: true },
    scoring: { kind: "raw" },
    sections: [
      {
        interactions: ["choice"],
        items: 8,
        key: "tu-darmstadt-mathematics",
        language: "de",
        seconds: 2400,
        translations: {
          de: { title: "Mathematik" },
          en: { title: "Mathematics" },
          id: { title: "Matematika" },
        },
        visibility: "internal-entry",
      },
    ],
  },
  routeSlugs: {
    de: "mathematik",
    en: "mathematics",
    id: "matematika",
  },
  sets: Arr.map([1, 2, 3, 4, 5, 6], (setNumber) => {
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
    de: { title: "Mathematik" },
    en: { title: "Mathematics" },
    id: { title: "Matematika" },
  },
} satisfies TrackSourceInput;
