import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Mit geänderten Messregeln plant das Team einen längeren Test von kontrastreichere Sammelplatzsymbole.",
        },
        {
          isCorrect: false,
          label:
            "Das Team will nur die Tage wiederholen, an denen die Änderung kontrastreichere Sammelplatzsymbole den höchsten Wert ergab.",
        },
        {
          isCorrect: false,
          label:
            "Das Team will kontrastreichere Sammelplatzsymbole dauerhaft einführen statt einen längeren Vergleich durchzuführen.",
        },
        {
          isCorrect: true,
          label:
            "Unter unveränderten Messregeln plant das Team einen längeren Versuch mit folgender Änderung: kontrastreichere Symbole für Sammelpunkte.",
        },
        {
          isCorrect: false,
          label:
            "Das Team plant einen längeren Test von kontrastreichere Sammelplatzsymbole ohne Vergleichsbedingung.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Using revised measurement rules, the team plans a longer test of higher-contrast assembly-point symbols.",
        },
        {
          isCorrect: false,
          label:
            "The team plans to repeat only the days on which higher-contrast assembly-point symbols produced the highest value.",
        },
        {
          isCorrect: false,
          label:
            "The team plans to adopt higher-contrast assembly-point symbols permanently instead of running a longer comparison.",
        },
        {
          isCorrect: true,
          label:
            "Using the same measurement rules, the team plans a longer test of higher-contrast assembly-point symbols.",
        },
        {
          isCorrect: false,
          label:
            "The team plans a longer test of higher-contrast assembly-point symbols without retaining a comparison condition.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dengan kaidah pengukuran yang diubah, tim merencanakan uji simbol titik kumpul dengan kontras lebih tinggi yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang hari ketika simbol titik kumpul dengan kontras lebih tinggi menghasilkan nilai tertinggi.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan menerapkan simbol titik kumpul dengan kontras lebih tinggi secara tetap sebagai pengganti perbandingan yang lebih panjang.",
        },
        {
          isCorrect: true,
          label:
            "Dengan aturan pengukuran yang sama, tim merencanakan uji simbol titik kumpul yang lebih kontras yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Tim merencanakan uji simbol titik kumpul dengan kontras lebih tinggi yang lebih panjang tanpa mempertahankan kondisi pembanding.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
