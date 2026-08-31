import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Mit geänderten Messregeln plant das Team einen längeren Test von Fragekarten an jedem Demonstrationstisch.",
        },
        {
          isCorrect: true,
          label:
            "Unter unveränderten Messregeln plant das Team einen längeren Versuch mit folgender Änderung: Fragekarten an jedem Demonstrationstisch.",
        },
        {
          isCorrect: false,
          label:
            "Das Team will nur die Tage wiederholen, an denen die Änderung Fragekarten an jedem Demonstrationstisch den höchsten Wert ergab.",
        },
        {
          isCorrect: false,
          label:
            "Das Team will Fragekarten an jedem Demonstrationstisch dauerhaft einführen statt einen längeren Vergleich durchzuführen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team plant einen längeren Test von Fragekarten an jedem Demonstrationstisch ohne Vergleichsbedingung.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Using revised measurement rules, the team plans a longer test of question cards at each demonstration table.",
        },
        {
          isCorrect: true,
          label:
            "Using the same measurement rules, the team plans a longer test of question cards at each demonstration table.",
        },
        {
          isCorrect: false,
          label:
            "The team plans to repeat only the days on which question cards at each demonstration table produced the highest value.",
        },
        {
          isCorrect: false,
          label:
            "The team plans to adopt question cards at each demonstration table permanently instead of running a longer comparison.",
        },
        {
          isCorrect: false,
          label:
            "The team plans a longer test of question cards at each demonstration table without retaining a comparison condition.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dengan kaidah pengukuran yang diubah, tim merencanakan uji kartu pertanyaan di setiap meja demonstrasi yang lebih panjang.",
        },
        {
          isCorrect: true,
          label:
            "Dengan aturan pengukuran yang sama, tim merencanakan uji kartu pertanyaan untuk setiap meja demonstrasi yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang hari ketika kartu pertanyaan di setiap meja demonstrasi menghasilkan nilai tertinggi.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan menerapkan kartu pertanyaan di setiap meja demonstrasi secara tetap sebagai pengganti perbandingan yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Tim merencanakan uji kartu pertanyaan di setiap meja demonstrasi yang lebih panjang tanpa mempertahankan kondisi pembanding.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
