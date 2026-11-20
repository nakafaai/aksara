import { Array as Arr } from "effect";
import { kaiserslauternRatings } from "#corpus/tryout/germany/entrance/ratings";
import type { TrackSourceInput } from "#corpus/tryout/schema";

/**
 * The mathematics test of the Aufnahmeprüfung at the Internationales
 * Studienkolleg of Hochschule Kaiserslautern, taken by applicants for the T
 * course. The Kolleg publishes 60 minutes, word problems ("Textaufgaben") at
 * Abitur level, and no aids. It publishes neither the number of tasks nor how
 * answers are given, so this paper asks 20 word problems with a typed numeric
 * result, and its description says so. It sits in the Kolleg's group.
 */
export const kaiserslauternEntranceTrack = {
  group: "hs-kaiserslautern",
  key: "hs-kaiserslautern-mathematics",
  order: 2,
  profile: {
    names: {
      de: {
        title:
          "Mathematikprüfung der Aufnahmeprüfung der Hochschule Kaiserslautern",
      },
      en: {
        title:
          "Mathematics paper of the Hochschule Kaiserslautern Aufnahmeprüfung",
      },
      id: {
        title: "Ujian Matematika Aufnahmeprüfung Hochschule Kaiserslautern",
      },
      ms: {
        title: "Ujian Matematik Aufnahmeprüfung Hochschule Kaiserslautern",
      },
    },
    report: { sections: false, standardError: false, total: true },
    scoring: { kind: "raw" },
    sections: [
      {
        explanation: "figure",
        interactions: ["numericEntry"],
        items: 20,
        key: "hs-kaiserslautern-mathematics",
        languages: ["de"],
        seconds: 3600,
        translations: {
          de: { title: "Mathematik" },
          en: { title: "Mathematics" },
          id: { title: "Matematika" },
          ms: { title: "Matematik" },
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
  sets: Arr.map(kaiserslauternRatings, (rating, index) => {
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
    de: {
      description:
        "Die Hochschule veröffentlicht 60 Minuten, Textaufgaben auf Abiturniveau und keine Hilfsmittel. Wie viele Aufgaben es gibt und wie man antwortet, veröffentlicht sie nicht. Dieser Probetest stellt deshalb 20 Textaufgaben, deren Ergebnis du als Zahl eintippst.",
      title: "Mathematik",
    },
    en: {
      description:
        "The Hochschule publishes 60 minutes, word problems at Abitur level and no aids. It does not publish how many tasks there are or how answers are given, so this try-out asks 20 word problems whose result you type in as a number.",
      title: "Mathematics",
    },
    id: {
      description:
        "Hochschule mengumumkan 60 menit, soal cerita setingkat Abitur, dan tanpa alat bantu. Jumlah soal dan cara menjawabnya tidak diumumkan, jadi try out ini memberi 20 soal cerita yang hasilnya kamu ketik sebagai angka.",
      title: "Matematika",
    },
    ms: {
      description:
        "Hochschule menyiarkan 60 minit, soalan berayat setaraf Abitur dan tanpa alat bantuan. Bilangan soalan dan cara menjawabnya tidak disiarkan, jadi ujian percubaan ini memberi 20 soalan berayat yang hasilnya kamu taip sebagai nombor.",
      title: "Matematik",
    },
  },
} satisfies TrackSourceInput;
