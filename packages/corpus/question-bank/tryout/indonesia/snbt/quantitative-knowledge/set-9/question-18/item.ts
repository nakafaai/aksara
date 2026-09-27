import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$24$$",
        },
        {
          isCorrect: false,
          label: "$$32$$",
        },
        {
          isCorrect: false,
          label: "$$40$$",
        },
        {
          isCorrect: false,
          label: "$$56$$",
        },
        {
          isCorrect: true,
          label: "$$48$$",
        },
      ],
    },
  },
};

export default item;
