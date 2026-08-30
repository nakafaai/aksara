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
          isCorrect: true,
          label:
            "Das Team prüfte eine Anzeige freier Plätze an der Tür (ruhige Lernzone) und bewertete die Befunde vorsichtig.",
        },
        {
          isCorrect: false,
          label:
            "Vorsichtige Prüfung im Kontext ruhige Lernzone: eine Anzeige freier Plätze an der Tür",
        },
        {
          isCorrect: false,
          label: "Der Wert mit Änderung, 34, lag über 24 und 26.",
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
          isCorrect: true,
          label:
            "The team tested a seat-availability board at the door in the quiet study zone and interpreted the evidence cautiously.",
        },
        {
          isCorrect: false,
          label:
            "A cautious trial of a seat-availability board at the door: quiet study zone",
        },
        {
          isCorrect: false,
          label: "The intervention value, 34, exceeded both 24 and 26.",
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
          isCorrect: true,
          label:
            "Tim menguji papan ketersediaan kursi di pintu pada zona belajar tenang dan menafsirkan buktinya secara hati-hati.",
        },
        {
          isCorrect: false,
          label:
            "Uji Hati-hati dalam zona belajar tenang: papan ketersediaan kursi di pintu",
        },
        {
          isCorrect: false,
          label: "Nilai pada hari dengan perubahan, 34, melampaui 24 dan 26.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
