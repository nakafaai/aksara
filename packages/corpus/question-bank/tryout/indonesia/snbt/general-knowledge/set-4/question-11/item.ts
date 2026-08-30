import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Änderung verdient eine längere Prüfung, doch der kurze Versuch erlaubt keine allgemeine Gewissheit.",
        },
        {
          isCorrect: false,
          label:
            "Tage, an denen der bisherige Ablauf ohne die geprüfte Änderung beibehalten wurde",
        },
        {
          isCorrect: true,
          label:
            "Die Aussagen der Nutzenden stützten das Zahlenmuster, bewiesen aber keine einzelne Ursache.",
        },
        {
          isCorrect: false,
          label:
            "prüfen, ob klarere Orientierung mit dem gemessenen Ergebnis zusammenhing, während Zeitplan und Personal stabil blieben",
        },
        {
          isCorrect: false,
          label: "Der Wert mit Änderung, 31, lag über 22 und 24.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The change deserves a longer test, but the short trial does not support universal certainty.",
        },
        {
          isCorrect: false,
          label:
            "days when the earlier process continued without the tested change",
        },
        {
          isCorrect: true,
          label:
            "User comments supported the numerical pattern but did not prove a single cause.",
        },
        {
          isCorrect: false,
          label:
            "to test whether clearer guidance was associated with the measured result while schedules and staffing stayed stable",
        },
        {
          isCorrect: false,
          label: "The intervention value, 31, exceeded both 22 and 24.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Perubahan layak diuji lebih lama, tetapi uji singkat itu belum mendukung kepastian universal.",
        },
        {
          isCorrect: false,
          label:
            "hari ketika alur lama tetap digunakan tanpa perubahan yang diuji",
        },
        {
          isCorrect: true,
          label:
            "Komentar pengguna mendukung pola angka, tetapi tidak membuktikan satu penyebab tunggal.",
        },
        {
          isCorrect: false,
          label:
            "menguji kaitan petunjuk yang lebih jelas dengan hasil terukur sambil mempertahankan jadwal dan jumlah petugas",
        },
        {
          isCorrect: false,
          label: "Nilai pada hari dengan perubahan, 31, melampaui 22 dan 24.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
