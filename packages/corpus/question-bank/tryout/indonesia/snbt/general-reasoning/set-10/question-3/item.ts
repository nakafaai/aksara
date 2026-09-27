import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Memperkuat pernyataan A",
        },
        {
          isCorrect: true,
          label: "Memperkuat pernyataan B",
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
      ],
    },
  },
};

export default item;
