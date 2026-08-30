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
          isCorrect: false,
          label: "Der Wert mit Änderung, 27, lag über 19 und 21.",
        },
        {
          isCorrect: false,
          label:
            "Tage, an denen der bisherige Ablauf ohne die geprüfte Änderung beibehalten wurde",
        },
        {
          isCorrect: true,
          label:
            "Vorsichtige Prüfung im Kontext Sprachaustausch für Lernende: Themenkarten für Gesprächsanfänge",
        },
        {
          isCorrect: false,
          label:
            "Die Aussagen der Nutzenden stützten das Zahlenmuster, bewiesen aber keine einzelne Ursache.",
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
          isCorrect: false,
          label: "The intervention value, 27, exceeded both 19 and 21.",
        },
        {
          isCorrect: false,
          label:
            "days when the earlier process continued without the tested change",
        },
        {
          isCorrect: true,
          label:
            "A cautious trial of topic cards for starting a conversation: student language exchange",
        },
        {
          isCorrect: false,
          label:
            "User comments supported the numerical pattern but did not prove a single cause.",
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
          isCorrect: false,
          label: "Nilai pada hari dengan perubahan, 27, melampaui 19 dan 21.",
        },
        {
          isCorrect: false,
          label:
            "hari ketika alur lama tetap digunakan tanpa perubahan yang diuji",
        },
        {
          isCorrect: true,
          label:
            "Uji Hati-hati dalam pertukaran bahasa pelajar: kartu topik untuk memulai percakapan",
        },
        {
          isCorrect: false,
          label:
            "Komentar pengguna mendukung pola angka, tetapi tidak membuktikan satu penyebab tunggal.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
