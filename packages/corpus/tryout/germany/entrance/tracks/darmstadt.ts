import { Array as Arr } from "effect";
import { darmstadtRatings } from "#corpus/tryout/germany/entrance/ratings";
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
        title: "Mathematics test of the TU Darmstadt Aufnahmeverfahren",
      },
      id: { title: "Tes Matematika Aufnahmeverfahren TU Darmstadt" },
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
    ms: "matematik",
  },
  sets: Arr.map(darmstadtRatings, (rating, index) => {
    const setNumber = index + 1;
    const setKey = `set-${setNumber}`;
    return {
      key: setKey,
      order: setNumber,
      rating,
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
    de: { title: "Mathematik" },
    en: { title: "Mathematics" },
    id: { title: "Matematika" },
    ms: { title: "Matematik" },
  },
} satisfies TrackSourceInput;
