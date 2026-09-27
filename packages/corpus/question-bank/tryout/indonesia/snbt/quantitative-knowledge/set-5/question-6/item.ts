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
          label: "$$P + Q = 1$$",
        },
        {
          isCorrect: true,
          label: "$$P > Q$$",
        },
        {
          isCorrect: false,
          label:
            "Informasi yang diberikan tidak cukup untuk memutuskan salah satu pilihan.",
        },
      ],
    },
  },
};

export default item;
