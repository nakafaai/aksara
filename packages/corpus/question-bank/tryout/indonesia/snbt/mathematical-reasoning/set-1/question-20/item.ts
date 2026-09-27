import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-23
const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$220$$",
        },
        {
          isCorrect: false,
          label: "$$260$$",
        },
        {
          isCorrect: false,
          label: "$$280$$",
        },
        {
          isCorrect: true,
          label: "$$240$$",
        },
        {
          isCorrect: false,
          label: "$$300$$",
        },
      ],
    },
  },
};

export default item;
