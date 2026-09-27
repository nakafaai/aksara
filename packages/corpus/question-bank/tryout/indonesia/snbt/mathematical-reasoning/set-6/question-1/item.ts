import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$5$$",
        },
        {
          isCorrect: false,
          label: "$$7$$",
        },
        {
          isCorrect: true,
          label: "$$6$$",
        },
        {
          isCorrect: false,
          label: "$$10$$",
        },
        {
          isCorrect: false,
          label: "$$13$$",
        },
      ],
    },
  },
};

export default item;
