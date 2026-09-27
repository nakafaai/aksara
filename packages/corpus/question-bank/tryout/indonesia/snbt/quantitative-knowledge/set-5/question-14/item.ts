import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$13x + y - 15 = 0$$",
        },
        {
          isCorrect: false,
          label: "$$-13x - y - 15 = 0$$",
        },
        {
          isCorrect: false,
          label: "$$13x - y - 15 = 0$$",
        },
        {
          isCorrect: false,
          label: "$$-13x + y - 15 = 0$$",
        },
        {
          isCorrect: false,
          label: "$$13x + y - 37 = 0$$",
        },
      ],
    },
  },
};

export default item;
