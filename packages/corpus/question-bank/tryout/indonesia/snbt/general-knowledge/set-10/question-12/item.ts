import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team prüfte Beispielgegenstände an jedem Behälter (Sortierung von Küstenabfällen) und bewertete die Befunde vorsichtig.",
        },
        {
          isCorrect: false,
          label: "Der Wert mit Änderung, 29, lag über 20 und 22.",
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
            "Vorsichtige Prüfung im Kontext Sortierung von Küstenabfällen: Beispielgegenstände an jedem Behälter",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team tested sample objects displayed on each container in the coastal litter sorting and interpreted the evidence cautiously.",
        },
        {
          isCorrect: false,
          label: "The intervention value, 29, exceeded both 20 and 22.",
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
            "A cautious trial of sample objects displayed on each container: coastal litter sorting",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim menguji contoh benda pada setiap wadah pada pemilahan sampah pesisir dan menafsirkan buktinya secara hati-hati.",
        },
        {
          isCorrect: false,
          label: "Nilai pada hari dengan perubahan, 29, melampaui 20 dan 22.",
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
            "Uji Hati-hati dalam setiap wadah pada pemilahan sampah pesisir: contoh benda",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
