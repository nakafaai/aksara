import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

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
          label: "$$P = Q$$",
        },
        {
          isCorrect: false,
          label: "$$P + Q = 3$$",
        },
        {
          isCorrect: true,
          label: "$$P < Q$$",
        },
        {
          isCorrect: false,
          label: "Tidak dapat ditentukan.",
        },
      ],
    },
  },
};

export default item;
