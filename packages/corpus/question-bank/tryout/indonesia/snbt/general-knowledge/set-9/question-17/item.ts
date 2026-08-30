import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team prüfte Themenkarten für Gesprächsanfänge (Sprachaustausch für Lernende) und bewertete die Befunde vorsichtig.",
        },
        {
          isCorrect: true,
          label:
            "Die Änderung verdient eine längere Prüfung, doch der kurze Versuch erlaubt keine allgemeine Gewissheit.",
        },
        {
          isCorrect: false,
          label: "Der Wert mit Änderung, 27, lag über 19 und 21.",
        },
        {
          isCorrect: false,
          label:
            "Tage, an denen der bisherige Ablauf ohne die geprüfte Änderung beibehalten wurde",
        },
        {
          isCorrect: false,
          label:
            "Vorsichtige Prüfung im Kontext Sprachaustausch für Lernende: Themenkarten für Gesprächsanfänge",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team tested topic cards for starting a conversation in the student language exchange and interpreted the evidence cautiously.",
        },
        {
          isCorrect: true,
          label:
            "The change deserves a longer test, but the short trial does not support universal certainty.",
        },
        {
          isCorrect: false,
          label: "The intervention value, 27, exceeded both 19 and 21.",
        },
        {
          isCorrect: false,
          label:
            "days when the earlier process continued without the tested change",
        },
        {
          isCorrect: false,
          label:
            "A cautious trial of topic cards for starting a conversation: student language exchange",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim menguji kartu topik untuk memulai percakapan pada pertukaran bahasa pelajar dan menafsirkan buktinya secara hati-hati.",
        },
        {
          isCorrect: true,
          label:
            "Perubahan layak diuji lebih lama, tetapi uji singkat itu belum mendukung kepastian universal.",
        },
        {
          isCorrect: false,
          label: "Nilai pada hari dengan perubahan, 27, melampaui 19 dan 21.",
        },
        {
          isCorrect: false,
          label:
            "hari ketika alur lama tetap digunakan tanpa perubahan yang diuji",
        },
        {
          isCorrect: false,
          label:
            "Uji Hati-hati dalam pertukaran bahasa pelajar: kartu topik untuk memulai percakapan",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
