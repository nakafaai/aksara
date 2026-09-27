import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-23
const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$94 \\text{ gram}$$",
        },
        {
          isCorrect: false,
          label: "$$90 \\text{ gram}$$",
        },
        {
          isCorrect: false,
          label: "$$92 \\text{ gram}$$",
        },
        {
          isCorrect: false,
          label: "$$96 \\text{ gram}$$",
        },
        {
          isCorrect: false,
          label: "$$98 \\text{ gram}$$",
        },
      ],
    },
  },
};

export default item;
