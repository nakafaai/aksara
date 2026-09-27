import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$21$$",
        },
        {
          isCorrect: false,
          label: "$$22$$",
        },
        {
          isCorrect: true,
          label: "$$24$$",
        },
        {
          isCorrect: false,
          label: "$$27$$",
        },
        {
          isCorrect: false,
          label: "$$30$$",
        },
      ],
    },
  },
};

export default item;
