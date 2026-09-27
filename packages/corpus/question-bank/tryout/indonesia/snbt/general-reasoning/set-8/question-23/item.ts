import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$64$$",
        },
        {
          isCorrect: false,
          label: "$$56$$",
        },
        {
          isCorrect: false,
          label: "$$60$$",
        },
        {
          isCorrect: false,
          label: "$$68$$",
        },
        {
          isCorrect: false,
          label: "$$72$$",
        },
      ],
    },
  },
};

export default item;
