import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Mit geänderten Messregeln plant das Team einen längeren Test von nach Rezeptschritten gruppierte Zutaten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team will nur die Tage wiederholen, an denen die Änderung nach Rezeptschritten gruppierte Zutaten den höchsten Wert ergab.",
        },
        {
          isCorrect: true,
          label:
            "Unter unveränderten Messregeln plant das Team einen längeren Versuch mit folgender Änderung: nach Rezeptschritten geordnete Zutaten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team will nach Rezeptschritten gruppierte Zutaten dauerhaft einführen statt einen längeren Vergleich durchzuführen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team plant einen längeren Test von nach Rezeptschritten gruppierte Zutaten ohne Vergleichsbedingung.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Using revised measurement rules, the team plans a longer test of ingredients grouped by recipe stage.",
        },
        {
          isCorrect: false,
          label:
            "The team plans to repeat only the days on which ingredients grouped by recipe stage produced the highest value.",
        },
        {
          isCorrect: true,
          label:
            "Using the same measurement rules, the team plans a longer test of ingredients grouped by recipe stage.",
        },
        {
          isCorrect: false,
          label:
            "The team plans to adopt ingredients grouped by recipe stage permanently instead of running a longer comparison.",
        },
        {
          isCorrect: false,
          label:
            "The team plans a longer test of ingredients grouped by recipe stage without retaining a comparison condition.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dengan kaidah pengukuran yang diubah, tim merencanakan uji bahan yang dikelompokkan menurut tahap resep yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang hari ketika bahan yang dikelompokkan menurut tahap resep menghasilkan nilai tertinggi.",
        },
        {
          isCorrect: true,
          label:
            "Dengan aturan pengukuran yang sama, tim merencanakan uji yang lebih lama terhadap bahan yang dikelompokkan menurut tahap resep.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan menerapkan bahan yang dikelompokkan menurut tahap resep secara tetap sebagai pengganti perbandingan yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Tim merencanakan uji bahan yang dikelompokkan menurut tahap resep yang lebih panjang tanpa mempertahankan kondisi pembanding.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
