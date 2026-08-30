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
            "Die Aussagen der Nutzenden stützten das Zahlenmuster, bewiesen aber keine einzelne Ursache.",
        },
        {
          isCorrect: false,
          label:
            "Vorsichtige Prüfung im Kontext Schulbuswarteschlange: eine markierte Spur für jedes Ziel",
        },
        {
          isCorrect: true,
          label:
            "Das Team prüfte eine markierte Spur für jedes Ziel (Schulbuswarteschlange) und bewertete die Befunde vorsichtig.",
        },
        {
          isCorrect: false,
          label: "Der Wert mit Änderung, 28, lag über 19 und 21.",
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
            "User comments supported the numerical pattern but did not prove a single cause.",
        },
        {
          isCorrect: false,
          label:
            "A cautious trial of a marked lane for each destination: school bus queue",
        },
        {
          isCorrect: true,
          label:
            "The team tested a marked lane for each destination in the school bus queue and interpreted the evidence cautiously.",
        },
        {
          isCorrect: false,
          label: "The intervention value, 28, exceeded both 19 and 21.",
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
            "Komentar pengguna mendukung pola angka, tetapi tidak membuktikan satu penyebab tunggal.",
        },
        {
          isCorrect: false,
          label:
            "Uji Hati-hati dalam antrean bus sekolah: penanda jalur untuk setiap tujuan",
        },
        {
          isCorrect: true,
          label:
            "Tim menguji penanda jalur untuk setiap tujuan pada antrean bus sekolah dan menafsirkan buktinya secara hati-hati.",
        },
        {
          isCorrect: false,
          label: "Nilai pada hari dengan perubahan, 28, melampaui 19 dan 21.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
