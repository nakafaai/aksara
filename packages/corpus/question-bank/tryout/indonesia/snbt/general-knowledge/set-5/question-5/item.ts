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
            "Vorsichtige Prüfung im Kontext abendlicher Leseraum: ausleihbare Schreibtischlampen",
        },
        {
          isCorrect: false,
          label: "Der Wert mit Änderung, 31, lag über 24 und 26.",
        },
        {
          isCorrect: true,
          label:
            "Das Team prüfte ausleihbare Schreibtischlampen (abendlicher Leseraum) und bewertete die Befunde vorsichtig.",
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
            "A cautious trial of desk lamps that visitors could borrow: evening reading room",
        },
        {
          isCorrect: false,
          label: "The intervention value, 31, exceeded both 24 and 26.",
        },
        {
          isCorrect: true,
          label:
            "The team tested desk lamps that visitors could borrow in the evening reading room and interpreted the evidence cautiously.",
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
            "Uji Hati-hati dalam ruang baca malam: lampu meja yang dapat dipinjam",
        },
        {
          isCorrect: false,
          label: "Nilai pada hari dengan perubahan, 31, melampaui 24 dan 26.",
        },
        {
          isCorrect: true,
          label:
            "Tim menguji lampu meja yang dapat dipinjam pada ruang baca malam dan menafsirkan buktinya secara hati-hati.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
