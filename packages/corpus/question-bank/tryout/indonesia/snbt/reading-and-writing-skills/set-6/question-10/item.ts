import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Mit geänderten Messregeln plant das Team einen längeren Test von Richtungspfeile an jeder Kreuzung.",
        },
        {
          isCorrect: false,
          label:
            "Das Team will nur die Tage wiederholen, an denen die Änderung Richtungspfeile an jeder Kreuzung den höchsten Wert ergab.",
        },
        {
          isCorrect: false,
          label:
            "Das Team will Richtungspfeile an jeder Kreuzung dauerhaft einführen statt einen längeren Vergleich durchzuführen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team plant einen längeren Test von Richtungspfeile an jeder Kreuzung ohne Vergleichsbedingung.",
        },
        {
          isCorrect: true,
          label:
            "Unter unveränderten Messregeln plant das Team einen längeren Versuch mit folgender Änderung: Richtungspfeile an jeder Abzweigung.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Using revised measurement rules, the team plans a longer test of direction arrows placed at each junction.",
        },
        {
          isCorrect: false,
          label:
            "The team plans to repeat only the days on which direction arrows placed at each junction produced the highest value.",
        },
        {
          isCorrect: false,
          label:
            "The team plans to adopt direction arrows placed at each junction permanently instead of running a longer comparison.",
        },
        {
          isCorrect: false,
          label:
            "The team plans a longer test of direction arrows placed at each junction without retaining a comparison condition.",
        },
        {
          isCorrect: true,
          label:
            "Using the same measurement rules, the team plans a longer test of direction arrows placed at each junction.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dengan kaidah pengukuran yang diubah, tim merencanakan uji panah arah di setiap persimpangan yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang hari ketika panah arah di setiap persimpangan menghasilkan nilai tertinggi.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan menerapkan panah arah di setiap persimpangan secara tetap sebagai pengganti perbandingan yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Tim merencanakan uji panah arah di setiap persimpangan yang lebih panjang tanpa mempertahankan kondisi pembanding.",
        },
        {
          isCorrect: true,
          label:
            "Dengan aturan pengukuran yang sama, tim merencanakan uji panah arah yang ditempatkan yang lebih panjang.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
