import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$54$$",
        },
        {
          isCorrect: true,
          label: "$$58$$",
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
          label: "$$62$$",
        },
      ],
    },
  },
};

export default item;
