import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team plant einen längeren Versuch mit geänderten Messregeln.",
        },
        {
          isCorrect: false,
          label:
            "Das Team will nur die Kurseinheiten mit dem höchsten Ergebnis wiederholen.",
        },
        {
          isCorrect: true,
          label:
            "Das Team plant einen längeren Versuch mit vielfältigeren Rezepten unter denselben Messregeln.",
        },
        {
          isCorrect: false,
          label:
            "Das Team will die neue Anordnung dauerhaft einführen statt erneut zu testen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team plant einen längeren Versuch mit ausschließlich denselben Rezepten.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The team plans a longer test with revised measurement rules.",
        },
        {
          isCorrect: false,
          label:
            "The team will repeat only the sessions with the highest result.",
        },
        {
          isCorrect: true,
          label:
            "The team plans a longer test with a wider range of recipes under the same measurement rules.",
        },
        {
          isCorrect: false,
          label:
            "The team will adopt the new layout permanently instead of testing again.",
        },
        {
          isCorrect: false,
          label: "The team plans a longer test using only the same recipes.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim merencanakan uji lebih lama dengan aturan pengukuran yang diubah.",
        },
        {
          isCorrect: false,
          label: "Tim akan mengulang hanya pertemuan dengan hasil tertinggi.",
        },
        {
          isCorrect: true,
          label:
            "Tim merencanakan uji lebih lama dengan resep lebih beragam dan aturan pengukuran yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan menerapkan susunan baru secara permanen sebagai pengganti uji lanjutan.",
        },
        {
          isCorrect: false,
          label: "Tim merencanakan uji lebih lama dengan resep yang sama saja.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
