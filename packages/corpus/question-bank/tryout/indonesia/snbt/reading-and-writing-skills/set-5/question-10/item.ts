import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Mit geänderten Messregeln plant das Team einen längeren Test von Beispielfotos für jede Zustandskategorie.",
        },
        {
          isCorrect: true,
          label:
            "Unter unveränderten Messregeln plant das Team einen längeren Versuch mit folgender Änderung: Beispielfotos für jede Zustandskategorie.",
        },
        {
          isCorrect: false,
          label:
            "Das Team will nur die Tage wiederholen, an denen die Änderung Beispielfotos für jede Zustandskategorie den höchsten Wert ergab.",
        },
        {
          isCorrect: false,
          label:
            "Das Team will Beispielfotos für jede Zustandskategorie dauerhaft einführen statt einen längeren Vergleich durchzuführen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team plant einen längeren Test von Beispielfotos für jede Zustandskategorie ohne Vergleichsbedingung.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Using revised measurement rules, the team plans a longer test of sample photos for each condition category.",
        },
        {
          isCorrect: true,
          label:
            "Using the same measurement rules, the team plans a longer test of sample photos for each condition category.",
        },
        {
          isCorrect: false,
          label:
            "The team plans to repeat only the days on which sample photos for each condition category produced the highest value.",
        },
        {
          isCorrect: false,
          label:
            "The team plans to adopt sample photos for each condition category permanently instead of running a longer comparison.",
        },
        {
          isCorrect: false,
          label:
            "The team plans a longer test of sample photos for each condition category without retaining a comparison condition.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dengan kaidah pengukuran yang diubah, tim merencanakan uji foto contoh untuk setiap kategori kondisi yang lebih panjang.",
        },
        {
          isCorrect: true,
          label:
            "Dengan aturan pengukuran yang sama, tim merencanakan uji yang lebih lama terhadap contoh foto untuk setiap kategori kondisi.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang hari ketika foto contoh untuk setiap kategori kondisi menghasilkan nilai tertinggi.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan menerapkan foto contoh untuk setiap kategori kondisi secara tetap sebagai pengganti perbandingan yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Tim merencanakan uji foto contoh untuk setiap kategori kondisi yang lebih panjang tanpa mempertahankan kondisi pembanding.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
