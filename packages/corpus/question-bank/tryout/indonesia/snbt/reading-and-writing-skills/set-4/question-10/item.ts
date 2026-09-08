import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Mit denselben Messregeln plante das Team einen längeren Test mit Fotoetiketten mit getrennter Auswertung neuer und erfahrener Ausleihender.",
        },
        {
          isCorrect: false,
          label:
            "Mit geänderten Messregeln plante das Team einen längeren Test mit Fotoetiketten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wollte nur die Versuchstermine mit Fotoetiketten mit dem höchsten Ergebnis wiederholen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wollte Fotoetiketten dauerhaft einführen statt einen längeren Versuch durchzuführen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team plante einen längeren Test, der neue und erfahrene Ausleihende ohne Unterscheidung zusammenfasste.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Using the same measurement rules, the team planned a longer photo-label test with separate data for new and returning borrowers.",
        },
        {
          isCorrect: false,
          label:
            "Using revised measurement rules, the team planned a longer photo-label test.",
        },
        {
          isCorrect: false,
          label:
            "The team planned to repeat only photo-label sessions with the highest result.",
        },
        {
          isCorrect: false,
          label:
            "The team planned to adopt photo labels permanently instead of running a longer test.",
        },
        {
          isCorrect: false,
          label:
            "The team planned a longer test that pooled new and returning borrowers without distinguishing them.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Dengan aturan ukur yang sama, tim merencanakan uji label foto yang lebih panjang serta pemisahan data peminjam baru dan lama.",
        },
        {
          isCorrect: false,
          label:
            "Dengan aturan ukur yang diubah, tim merencanakan uji label foto yang lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang hanya sesi label foto yang menghasilkan nilai tertinggi.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan menerapkan label foto secara permanen sebagai pengganti uji lebih panjang.",
        },
        {
          isCorrect: false,
          label:
            "Tim merencanakan uji lebih panjang dengan menggabungkan data peminjam baru dan lama tanpa membedakannya.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
