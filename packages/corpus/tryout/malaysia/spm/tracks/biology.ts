import {
  ENGLISH_APP_LOCALE_CODE,
  MALAY_APP_LOCALE_CODE,
} from "@nakafa/aksara-contracts/locale";
import { Array as Arr } from "effect";
import { biologyRatings } from "#corpus/tryout/malaysia/spm/ratings";
import type { TrackSourceInput } from "#corpus/tryout/schema";

/**
 * SPM Biologi Paper 1 (4551/1): 40 objective items in 75 minutes, single choice
 * with a few combined choices, printed in Malay with the English beneath, as
 * the Lembaga Peperiksaan format book shows. A learner starts in Malay and
 * may switch to English at any time, as the real paper prints both.
 */
export const spmBiologyTrack = {
  group: "form-5",
  key: "biology",
  order: 3,
  profile: {
    names: {
      de: { title: "SPM Biologie, Teil 1 (4551/1)" },
      en: { title: "SPM Biology Paper 1 (4551/1)" },
      id: { title: "SPM Biologi Kertas 1 (4551/1)" },
      ms: { title: "SPM Biologi Kertas 1 (4551/1)" },
    },
    report: { sections: false, standardError: false, total: true },
    scoring: { kind: "raw" },
    sections: [
      {
        interactions: ["choice"],
        items: 40,
        key: "biology",
        languages: [MALAY_APP_LOCALE_CODE, ENGLISH_APP_LOCALE_CODE],
        seconds: 4500,
        translations: {
          de: { title: "Biologie" },
          en: { title: "Biology" },
          id: { title: "Biologi" },
          ms: { title: "Biologi" },
        },
        visibility: "internal-entry",
      },
    ],
  },
  routeSlugs: {
    de: "biologie",
    en: "biology",
    id: "biologi",
    ms: "biologi",
  },
  sets: Arr.map(biologyRatings, (rating, index) => {
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
    de: { title: "Biologie" },
    en: { title: "Biology" },
    id: { title: "Biologi" },
    ms: { title: "Biologi" },
  },
} satisfies TrackSourceInput;
