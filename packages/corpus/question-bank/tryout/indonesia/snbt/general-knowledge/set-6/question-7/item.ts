import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tage, an denen der bisherige Ablauf ohne die geprüfte Änderung beibehalten wurde",
        },
        {
          isCorrect: false,
          label:
            "Die Aussagen der Nutzenden stützten das Zahlenmuster, bewiesen aber keine einzelne Ursache.",
        },
        {
          isCorrect: false,
          label:
            "Die Änderung verdient eine längere Prüfung, doch der kurze Versuch erlaubt keine allgemeine Gewissheit.",
        },
        {
          isCorrect: true,
          label:
            "prüfen, ob klarere Orientierung mit dem gemessenen Ergebnis zusammenhing, während Zeitplan und Personal stabil blieben",
        },
        {
          isCorrect: false,
          label:
            "Das Team prüfte eine markierte Spur für jedes Ziel (Schulbuswarteschlange) und bewertete die Befunde vorsichtig.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "days when the earlier process continued without the tested change",
        },
        {
          isCorrect: false,
          label:
            "User comments supported the numerical pattern but did not prove a single cause.",
        },
        {
          isCorrect: false,
          label:
            "The change deserves a longer test, but the short trial does not support universal certainty.",
        },
        {
          isCorrect: true,
          label:
            "to test whether clearer guidance was associated with the measured result while schedules and staffing stayed stable",
        },
        {
          isCorrect: false,
          label:
            "The team tested a marked lane for each destination in the school bus queue and interpreted the evidence cautiously.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "hari ketika alur lama tetap digunakan tanpa perubahan yang diuji",
        },
        {
          isCorrect: false,
          label:
            "Komentar pengguna mendukung pola angka, tetapi tidak membuktikan satu penyebab tunggal.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan layak diuji lebih lama, tetapi uji singkat itu belum mendukung kepastian universal.",
        },
        {
          isCorrect: true,
          label:
            "menguji kaitan petunjuk yang lebih jelas dengan hasil terukur sambil mempertahankan jadwal dan jumlah petugas",
        },
        {
          isCorrect: false,
          label:
            "Tim menguji penanda jalur untuk setiap tujuan pada antrean bus sekolah dan menafsirkan buktinya secara hati-hati.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
