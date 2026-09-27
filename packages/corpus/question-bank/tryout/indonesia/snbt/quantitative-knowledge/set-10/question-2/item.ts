import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$90 - x$$",
        },
        {
          isCorrect: false,
          label: "$$90 - 2x$$",
        },
        {
          isCorrect: false,
          label: "$$180 - x$$",
        },
        {
          isCorrect: false,
          label: "Tidak diketahui",
        },
        {
          isCorrect: true,
          label: "$$180 - 2x$$",
        },
      ],
    },
  },
};

export default item;
