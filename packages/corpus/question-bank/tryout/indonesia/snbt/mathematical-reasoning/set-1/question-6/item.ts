import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-23
const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$5\\%$$",
        },
        {
          isCorrect: true,
          label: "$$10\\%$$",
        },
        {
          isCorrect: false,
          label: "$$8\\%$$",
        },
        {
          isCorrect: false,
          label: "$$12\\%$$",
        },
        {
          isCorrect: false,
          label: "$$15\\%$$",
        },
      ],
    },
  },
};

export default item;
