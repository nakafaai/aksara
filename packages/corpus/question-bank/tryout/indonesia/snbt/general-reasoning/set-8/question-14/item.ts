import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Stärkt Aussage A",
        },
        {
          isCorrect: false,
          label: "Schwächt Aussage A",
        },
        {
          isCorrect: false,
          label: "Schwächt Aussage B",
        },
        {
          isCorrect: false,
          label: "Für die Aussagen A und B irrelevant",
        },
        {
          isCorrect: true,
          label: "Stärkt Aussage B",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Strengthens statement A",
        },
        {
          isCorrect: false,
          label: "Weakens statement A",
        },
        {
          isCorrect: false,
          label: "Weakens statement B",
        },
        {
          isCorrect: false,
          label: "Irrelevant to statements A and B",
        },
        {
          isCorrect: true,
          label: "Strengthens statement B",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Memperkuat pernyataan A",
        },
        {
          isCorrect: false,
          label: "Memperlemah pernyataan A",
        },
        {
          isCorrect: false,
          label: "Memperlemah pernyataan B",
        },
        {
          isCorrect: false,
          label: "Tidak relevan dengan pernyataan A dan B",
        },
        {
          isCorrect: true,
          label: "Memperkuat pernyataan B",
        },
      ],
    },
  },
};

export default item;
