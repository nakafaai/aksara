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
          label: "$$PQ = 32$$",
        },
        {
          isCorrect: false,
          label: "Tidak dapat ditentukan",
        },
        {
          isCorrect: true,
          label: "$$P > Q$$",
        },
      ],
    },
  },
};

export default item;
