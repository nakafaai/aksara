import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$150$$",
        },
        {
          isCorrect: false,
          label: "$$160$$",
        },
        {
          isCorrect: false,
          label: "$$200$$",
        },
        {
          isCorrect: false,
          label: "$$225$$",
        },
        {
          isCorrect: true,
          label: "$$180$$",
        },
      ],
    },
  },
};

export default item;
