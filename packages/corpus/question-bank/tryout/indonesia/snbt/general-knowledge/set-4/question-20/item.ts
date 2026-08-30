import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team prüfte vom Eingang sichtbare Stellplatznummern (Fahrradparkplatz auf dem Campus) und bewertete die Befunde vorsichtig.",
        },
        {
          isCorrect: false,
          label: "Der Wert mit Änderung, 33, lag über 23 und 25.",
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
        {
          isCorrect: true,
          label:
            "Vorsichtige Prüfung im Kontext Fahrradparkplatz auf dem Campus: vom Eingang sichtbare Stellplatznummern",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team tested rack numbers visible from the entrance in the campus bicycle parking and interpreted the evidence cautiously.",
        },
        {
          isCorrect: false,
          label: "The intervention value, 33, exceeded both 23 and 25.",
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
        {
          isCorrect: true,
          label:
            "A cautious trial of rack numbers visible from the entrance: campus bicycle parking",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim menguji nomor rak yang terlihat dari pintu masuk pada parkir sepeda kampus dan menafsirkan buktinya secara hati-hati.",
        },
        {
          isCorrect: false,
          label: "Nilai pada hari dengan perubahan, 33, melampaui 23 dan 25.",
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
        {
          isCorrect: true,
          label:
            "Uji Hati-hati dalam parkir sepeda kampus: nomor rak yang terlihat dari pintu masuk",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
