import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Mit geänderten Messregeln plant das Team einen längeren Test von Menüvorbestellung am Vortag.",
        },
        {
          isCorrect: false,
          label:
            "Das Team will nur die Tage wiederholen, an denen die Änderung Menüvorbestellung am Vortag den höchsten Wert ergab.",
        },
        {
          isCorrect: true,
          label:
            "Unter unveränderten Messregeln plant das Team einen längeren Versuch mit folgender Änderung: Menübestellung am Vortag.",
        },
        {
          isCorrect: false,
          label:
            "Das Team will Menüvorbestellung am Vortag dauerhaft einführen statt einen längeren Vergleich durchzuführen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team plant einen längeren Test von Menüvorbestellung am Vortag ohne Vergleichsbedingung.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Using revised measurement rules, the team plans a longer test of menu booking one day in advance.",
        },
        {
          isCorrect: false,
          label:
            "The team plans to repeat only the days on which menu booking one day in advance produced the highest value.",
        },
        {
          isCorrect: true,
          label:
            "Using the same measurement rules, the team plans a longer test of menu booking one day in advance.",
        },
        {
          isCorrect: false,
          label:
            "The team plans to adopt menu booking one day in advance permanently instead of running a longer comparison.",
        },
        {
          isCorrect: false,
          label:
            "The team plans a longer test of menu booking one day in advance without retaining a comparison condition.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dengan kaidah pengukuran yang diubah, tim merencanakan uji pemesanan menu sehari sebelumnya yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang hari ketika pemesanan menu sehari sebelumnya menghasilkan nilai tertinggi.",
        },
        {
          isCorrect: true,
          label:
            "Dengan aturan pengukuran yang sama, tim merencanakan uji pemesanan menu sehari sebelumnya yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan menerapkan pemesanan menu sehari sebelumnya secara tetap sebagai pengganti perbandingan yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Tim merencanakan uji pemesanan menu sehari sebelumnya yang lebih panjang tanpa mempertahankan kondisi pembanding.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
