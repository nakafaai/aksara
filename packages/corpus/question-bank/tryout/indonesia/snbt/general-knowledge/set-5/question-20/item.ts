import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team prüfte die Wahl zwischen kleinen und normalen Portionen (Kantine zur Verringerung von Speiseresten) und bewertete die Befunde vorsichtig.",
        },
        {
          isCorrect: true,
          label:
            "Vorsichtige Prüfung im Kontext Kantine zur Verringerung von Speiseresten: die Wahl zwischen kleinen und normalen Portionen",
        },
        {
          isCorrect: false,
          label: "Der Wert mit Änderung, 26, lag über 18 und 20.",
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
            "The team tested a choice between small and regular portions in the food-waste reduction canteen and interpreted the evidence cautiously.",
        },
        {
          isCorrect: true,
          label:
            "A cautious trial of a choice between small and regular portions: food-waste reduction canteen",
        },
        {
          isCorrect: false,
          label: "The intervention value, 26, exceeded both 18 and 20.",
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
            "Tim menguji pilihan porsi kecil dan porsi biasa pada kantin bebas sisa makanan dan menafsirkan buktinya secara hati-hati.",
        },
        {
          isCorrect: true,
          label:
            "Uji Hati-hati dalam kantin bebas sisa makanan: pilihan porsi kecil dan porsi biasa",
        },
        {
          isCorrect: false,
          label: "Nilai pada hari dengan perubahan, 26, melampaui 18 dan 20.",
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
  stimulusKey: "passage-2",
};

export default item;
