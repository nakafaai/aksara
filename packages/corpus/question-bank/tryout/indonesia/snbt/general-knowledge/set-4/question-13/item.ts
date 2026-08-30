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
            "Das Team prüfte vom Eingang sichtbare Stellplatznummern (Fahrradparkplatz auf dem Campus) und bewertete die Befunde vorsichtig.",
        },
        {
          isCorrect: false,
          label:
            "Vorsichtige Prüfung im Kontext Fahrradparkplatz auf dem Campus: vom Eingang sichtbare Stellplatznummern",
        },
        {
          isCorrect: false,
          label: "Der Wert mit Änderung, 33, lag über 23 und 25.",
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
            "The team tested rack numbers visible from the entrance in the campus bicycle parking and interpreted the evidence cautiously.",
        },
        {
          isCorrect: false,
          label:
            "A cautious trial of rack numbers visible from the entrance: campus bicycle parking",
        },
        {
          isCorrect: false,
          label: "The intervention value, 33, exceeded both 23 and 25.",
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
            "Tim menguji nomor rak yang terlihat dari pintu masuk pada parkir sepeda kampus dan menafsirkan buktinya secara hati-hati.",
        },
        {
          isCorrect: false,
          label:
            "Uji Hati-hati dalam parkir sepeda kampus: nomor rak yang terlihat dari pintu masuk",
        },
        {
          isCorrect: false,
          label: "Nilai pada hari dengan perubahan, 33, melampaui 23 dan 25.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
