import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Unter unveränderten Messregeln plant das Team einen längeren Versuch mit folgender Änderung: Fotoetiketten an den Rückgaberegalen.",
        },
        {
          isCorrect: false,
          label:
            "Mit geänderten Messregeln plant das Team einen längeren Test von Fotobeschriftungen an den Rückgaberegalen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team will nur die Tage wiederholen, an denen die Änderung Fotobeschriftungen an den Rückgaberegalen den höchsten Wert ergab.",
        },
        {
          isCorrect: false,
          label:
            "Das Team will Fotobeschriftungen an den Rückgaberegalen dauerhaft einführen statt einen längeren Vergleich durchzuführen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team plant einen längeren Test von Fotobeschriftungen an den Rückgaberegalen ohne Vergleichsbedingung.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Using the same measurement rules, the team plans a longer test of photo labels on the return shelves.",
        },
        {
          isCorrect: false,
          label:
            "Using revised measurement rules, the team plans a longer test of photo labels on the return shelves.",
        },
        {
          isCorrect: false,
          label:
            "The team plans to repeat only the days on which photo labels on the return shelves produced the highest value.",
        },
        {
          isCorrect: false,
          label:
            "The team plans to adopt photo labels on the return shelves permanently instead of running a longer comparison.",
        },
        {
          isCorrect: false,
          label:
            "The team plans a longer test of photo labels on the return shelves without retaining a comparison condition.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Dengan aturan pengukuran yang sama, tim merencanakan uji label foto yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Dengan kaidah pengukuran yang diubah, tim merencanakan uji label foto pada rak pengembalian yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang hari ketika label foto pada rak pengembalian menghasilkan nilai tertinggi.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan menerapkan label foto pada rak pengembalian secara tetap sebagai pengganti perbandingan yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Tim merencanakan uji label foto pada rak pengembalian yang lebih panjang tanpa mempertahankan kondisi pembanding.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
