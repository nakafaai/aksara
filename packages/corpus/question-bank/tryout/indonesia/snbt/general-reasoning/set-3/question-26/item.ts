import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$C$$",
        },
        {
          isCorrect: false,
          label: "$$A$$",
        },
        {
          isCorrect: false,
          label: "$$B$$",
        },
        {
          isCorrect: false,
          label: "Mesin $$A$$ dan $$C$$ memiliki indeks tertinggi yang sama",
        },
        {
          isCorrect: false,
          label: "Mesin $$B$$ dan $$C$$ memiliki indeks tertinggi yang sama",
        },
      ],
    },
  },
};

export default item;
