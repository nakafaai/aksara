import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$36$$",
        },
        {
          isCorrect: false,
          label: "$$42$$",
        },
        {
          isCorrect: false,
          label: "$$48$$",
        },
        {
          isCorrect: false,
          label: "$$54$$",
        },
        {
          isCorrect: true,
          label: "$$45$$",
        },
      ],
    },
  },
};

export default item;
