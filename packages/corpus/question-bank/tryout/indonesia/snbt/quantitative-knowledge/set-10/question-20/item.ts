import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$P < Q$$",
        },
        {
          isCorrect: false,
          label: "$$P = Q$$",
        },
        {
          isCorrect: false,
          label: "$$P = 2Q$$",
        },
        {
          isCorrect: true,
          label: "$$P > Q$$",
        },
        {
          isCorrect: false,
          label: "Hubungan tidak dapat ditentukan.",
        },
      ],
    },
  },
};

export default item;
