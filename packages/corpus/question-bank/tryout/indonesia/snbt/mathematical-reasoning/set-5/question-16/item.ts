import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$13$$",
        },
        {
          isCorrect: false,
          label: "$$15$$",
        },
        {
          isCorrect: false,
          label: "$$17$$",
        },
        {
          isCorrect: true,
          label: "$$19$$",
        },
        {
          isCorrect: false,
          label: "$$21$$",
        },
      ],
    },
  },
};

export default item;
