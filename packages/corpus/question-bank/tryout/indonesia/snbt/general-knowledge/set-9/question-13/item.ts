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
            "Vorsichtige Prüfung im Kontext Sprachaustausch für Lernende: Themenkarten für Gesprächsanfänge",
        },
        {
          isCorrect: false,
          label: "Der Wert mit Änderung, 27, lag über 19 und 21.",
        },
        {
          isCorrect: true,
          label:
            "Das Team prüfte Themenkarten für Gesprächsanfänge (Sprachaustausch für Lernende) und bewertete die Befunde vorsichtig.",
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
            "A cautious trial of topic cards for starting a conversation: student language exchange",
        },
        {
          isCorrect: false,
          label: "The intervention value, 27, exceeded both 19 and 21.",
        },
        {
          isCorrect: true,
          label:
            "The team tested topic cards for starting a conversation in the student language exchange and interpreted the evidence cautiously.",
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
            "Uji Hati-hati dalam pertukaran bahasa pelajar: kartu topik untuk memulai percakapan",
        },
        {
          isCorrect: false,
          label: "Nilai pada hari dengan perubahan, 27, melampaui 19 dan 21.",
        },
        {
          isCorrect: true,
          label:
            "Tim menguji kartu topik untuk memulai percakapan pada pertukaran bahasa pelajar dan menafsirkan buktinya secara hati-hati.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
