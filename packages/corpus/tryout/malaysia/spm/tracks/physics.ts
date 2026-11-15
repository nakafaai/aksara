import {
  ENGLISH_APP_LOCALE_CODE,
  MALAY_APP_LOCALE_CODE,
} from "@nakafa/aksara-contracts/locale";
import { Array as Arr } from "effect";
import { physicsRatings } from "#corpus/tryout/malaysia/spm/ratings";
import type { TrackSourceInput } from "#corpus/tryout/schema";

/**
 * SPM Fizik Paper 1 (4531/1): 40 objective items in 75 minutes, single choice
 * with a few combined choices, printed in Malay with the English beneath, as
 * the Lembaga Peperiksaan format book shows. A learner starts in Malay and
 * may switch to English at any time, as the real paper prints both.
 */
export const spmPhysicsTrack = {
  group: "form-5",
  key: "physics",
  order: 1,
  profile: {
    names: {
      de: { title: "SPM Physik, Teil 1 (4531/1)" },
      en: { title: "SPM Physics Paper 1 (4531/1)" },
      id: { title: "SPM Fisika Kertas 1 (4531/1)" },
      ms: { title: "SPM Fizik Kertas 1 (4531/1)" },
    },
    report: { sections: false, standardError: false, total: true },
    scoring: { kind: "raw" },
    sections: [
      {
        interactions: ["choice"],
        items: 40,
        key: "physics",
        languages: [MALAY_APP_LOCALE_CODE, ENGLISH_APP_LOCALE_CODE],
        seconds: 4500,
        translations: {
          de: { title: "Physik" },
          en: { title: "Physics" },
          id: { title: "Fisika" },
          ms: { title: "Fizik" },
        },
        visibility: "internal-entry",
      },
    ],
  },
  routeSlugs: {
    de: "physik",
    en: "physics",
    id: "fisika",
    ms: "fizik",
  },
  sets: Arr.map(physicsRatings, (rating, index) => {
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
    de: { title: "Physik" },
    en: { title: "Physics" },
    id: { title: "Fisika" },
    ms: { title: "Fizik" },
  },
} satisfies TrackSourceInput;
