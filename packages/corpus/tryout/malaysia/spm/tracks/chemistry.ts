import { Array as Arr } from "effect";
import { chemistryRatings } from "#corpus/tryout/malaysia/spm/ratings";
import type { TrackSourceInput } from "#corpus/tryout/schema";

/**
 * SPM Kimia Paper 1 (4541/1): 40 objective items in 75 minutes, single choice
 * with a few combined choices, printed in Malay with the English beneath, as
 * the Lembaga Peperiksaan format book shows. A learner sits the Malay version;
 * every item also carries its English version.
 */
export const spmChemistryTrack = {
  group: "form-5",
  key: "chemistry",
  order: 2,
  profile: {
    names: {
      de: { title: "SPM Chemie, Teil 1 (4541/1)" },
      en: { title: "SPM Chemistry Paper 1 (4541/1)" },
      id: { title: "SPM Kimia Kertas 1 (4541/1)" },
      ms: { title: "SPM Kimia Kertas 1 (4541/1)" },
    },
    report: { sections: false, standardError: false, total: true },
    scoring: { kind: "raw" },
    sections: [
      {
        interactions: ["choice"],
        items: 40,
        key: "chemistry",
        language: "ms",
        seconds: 4500,
        translations: {
          de: { title: "Chemie" },
          en: { title: "Chemistry" },
          id: { title: "Kimia" },
          ms: { title: "Kimia" },
        },
        visibility: "internal-entry",
      },
    ],
  },
  routeSlugs: {
    de: "chemie",
    en: "chemistry",
    id: "kimia",
    ms: "kimia",
  },
  sets: Arr.map(chemistryRatings, (rating, index) => {
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
    de: { title: "Chemie" },
    en: { title: "Chemistry" },
    id: { title: "Kimia" },
    ms: { title: "Kimia" },
  },
} satisfies TrackSourceInput;
