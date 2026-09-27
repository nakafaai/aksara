import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$154$$",
        },
        {
          isCorrect: false,
          label: "$$160$$",
        },
        {
          isCorrect: false,
          label: "$$168$$",
        },
        {
          isCorrect: true,
          label: "$$165$$",
        },
        {
          isCorrect: false,
          label: "$$169$$",
        },
      ],
    },
  },
};

export default item;
