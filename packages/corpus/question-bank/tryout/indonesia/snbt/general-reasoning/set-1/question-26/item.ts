import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Bekräftigt Aussage A",
        },
        {
          isCorrect: false,
          label: "Schwächt Aussage A",
        },
        {
          isCorrect: true,
          label: "Für die Aussagen A und B irrelevant",
        },
        {
          isCorrect: false,
          label: "Bekräftigt Aussage B",
        },
        {
          isCorrect: false,
          label: "Schwächt Aussage B",
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
          isCorrect: true,
          label: "Irrelevant to statements A and B",
        },
        {
          isCorrect: false,
          label: "Strengthens statement B",
        },
        {
          isCorrect: false,
          label: "Weakens statement B",
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
          isCorrect: true,
          label: "Tidak relevan dengan pernyataan A dan B",
        },
        {
          isCorrect: false,
          label: "Memperkuat pernyataan B",
        },
        {
          isCorrect: false,
          label: "Memperlemah pernyataan B",
        },
      ],
    },
  },
};

export default item;
