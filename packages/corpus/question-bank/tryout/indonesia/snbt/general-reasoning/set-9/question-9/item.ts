import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Stärkt Aussage B",
        },
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
          label: "Ist für beide Aussagen irrelevant",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Strengthens Statement B",
        },
        {
          isCorrect: false,
          label: "Strengthens Statement A",
        },
        {
          isCorrect: false,
          label: "Weakens Statement A",
        },
        {
          isCorrect: false,
          label: "Weakens Statement B",
        },
        {
          isCorrect: false,
          label: "Is irrelevant to both statements",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Memperkuat Pernyataan B",
        },
        {
          isCorrect: false,
          label: "Memperkuat Pernyataan A",
        },
        {
          isCorrect: false,
          label: "Memperlemah Pernyataan A",
        },
        {
          isCorrect: false,
          label: "Memperlemah Pernyataan B",
        },
        {
          isCorrect: false,
          label: "Tidak relevan dengan kedua pernyataan",
        },
      ],
    },
  },
};

export default item;
