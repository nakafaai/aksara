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
          label: "$$P < Q$$",
        },
        {
          isCorrect: true,
          label: "$$P = Q$$",
        },
        {
          isCorrect: false,
          label: "$$PQ = 1$$",
        },
        {
          isCorrect: false,
          label: "Tidak dapat ditentukan",
        },
      ],
    },
  },
};

export default item;
