import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-22
const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$P > Q$$",
        },
        {
          isCorrect: false,
          label: "$$Q > P$$",
        },
        {
          isCorrect: false,
          label: "$$P = 2Q$$",
        },
        {
          isCorrect: true,
          label: "$$P = Q$$",
        },
        {
          isCorrect: false,
          label:
            "Hubungan antara $$P$$ dan $$Q$$ tidak dapat ditentukan dari informasi yang diberikan.",
        },
      ],
    },
  },
};

export default item;
