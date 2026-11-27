import { Array as Arr } from "effect";
import { darmstadtFspRatings } from "#corpus/tryout/germany/feststellungspruefung/ratings";
import type { TrackSourceInput } from "#corpus/tryout/schema";

/**
 * The written mathematics paper of the Feststellungsprüfung in the T course
 * at the Studienkolleg of TU Darmstadt. The Kolleg's Muster-FSP of December
 * 2024 gives 180 minutes, a non-graphing, non-programmable calculator and one
 * handwritten A4 formula sheet, open tasks whose working must be shown, and
 * three Aufgaben of 38, 4 and 21 points. Every set follows that structure:
 * each Teilaufgabe is a typed term or number, or a written solution scored
 * against a rubric. The paper is held until written answers are graded live.
 */
export const tuDarmstadtFspTrack = {
  group: "tu-darmstadt",
  held: true,
  key: "tu-darmstadt-fsp-mathematics",
  order: 1,
  profile: {
    names: {
      de: {
        title: "Mathematikklausur der Feststellungsprüfung der TU Darmstadt",
      },
      en: {
        title: "Mathematics paper of the TU Darmstadt Feststellungsprüfung",
      },
      id: { title: "Ujian Matematika Feststellungsprüfung TU Darmstadt" },
      ms: { title: "Ujian Matematik Feststellungsprüfung TU Darmstadt" },
    },
    report: { sections: false, standardError: false, total: true },
    scoring: { kind: "raw" },
    sections: [
      {
        explanation: "figure",
        interactions: ["extendedText", "mathEntry", "numericEntry"],
        items: 3,
        key: "tu-darmstadt-fsp-mathematics",
        languages: ["de"],
        seconds: 10_800,
        tools: ["calculator-scientific", "formula-sheet"],
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
  sets: Arr.map(darmstadtFspRatings, (rating, index) => {
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
        "Wie in der Muster-FSP des Studienkollegs hast du 180 Minuten, drei Aufgaben mit 38, 4 und 21 Punkten, einen Taschenrechner ohne Grafik und ein handgeschriebenes Formelblatt. Die schriftliche Klausur zählt neben der Vornote und, falls angesetzt, der mündlichen Prüfung, die dieser Probetest nicht enthält.",
      title: "Mathematik",
    },
    en: {
      description:
        "As in the Kolleg's Muster-FSP, you have 180 minutes, three Aufgaben worth 38, 4 and 21 points, a non-graphing calculator and a handwritten formula sheet. The written paper counts beside the course grade and, where one is held, the oral exam, which this try-out doesn't include.",
      title: "Mathematics",
    },
    id: {
      description:
        "Seperti Muster-FSP dari Studienkolleg, waktunya 180 menit dengan tiga Aufgabe bernilai 38, 4, dan 21 poin, kalkulator tanpa grafik, dan satu lembar rumus tulisan tangan. Ujian tertulis dihitung bersama nilai kursus dan, bila diadakan, ujian lisan, yang tidak ada di try out ini.",
      title: "Matematika",
    },
    ms: {
      description:
        "Seperti Muster-FSP Studienkolleg, masanya 180 minit dengan tiga Aufgabe bernilai 38, 4 dan 21 markah, kalkulator tanpa grafik dan sehelai helaian rumus tulisan tangan. Ujian bertulis dikira bersama gred kursus dan, jika diadakan, ujian lisan, yang tiada dalam ujian percubaan ini.",
      title: "Matematik",
    },
  },
} satisfies TrackSourceInput;
