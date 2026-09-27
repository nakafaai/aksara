import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$40$$",
        },
        {
          isCorrect: false,
          label: "$$42$$",
        },
        {
          isCorrect: false,
          label: "$$46$$",
        },
        {
          isCorrect: false,
          label: "$$48$$",
        },
        {
          isCorrect: true,
          label: "$$44$$",
        },
      ],
    },
  },
};

export default item;
