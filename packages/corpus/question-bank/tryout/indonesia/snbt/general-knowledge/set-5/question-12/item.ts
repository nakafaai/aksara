import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team prüfte ausleihbare Schreibtischlampen (abendlicher Leseraum) und bewertete die Befunde vorsichtig.",
        },
        {
          isCorrect: false,
          label: "Der Wert mit Änderung, 31, lag über 24 und 26.",
        },
        {
          isCorrect: true,
          label:
            "Vorsichtige Prüfung im Kontext abendlicher Leseraum: ausleihbare Schreibtischlampen",
        },
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
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team tested desk lamps that visitors could borrow in the evening reading room and interpreted the evidence cautiously.",
        },
        {
          isCorrect: false,
          label: "The intervention value, 31, exceeded both 24 and 26.",
        },
        {
          isCorrect: true,
          label:
            "A cautious trial of desk lamps that visitors could borrow: evening reading room",
        },
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
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim menguji lampu meja yang dapat dipinjam pada ruang baca malam dan menafsirkan buktinya secara hati-hati.",
        },
        {
          isCorrect: false,
          label: "Nilai pada hari dengan perubahan, 31, melampaui 24 dan 26.",
        },
        {
          isCorrect: true,
          label:
            "Uji Hati-hati dalam ruang baca malam: lampu meja yang dapat dipinjam",
        },
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
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
