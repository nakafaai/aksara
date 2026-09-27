import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$V$$",
        },
        {
          isCorrect: false,
          label: "$$W$$",
        },
        {
          isCorrect: false,
          label: "$$X$$",
        },
        {
          isCorrect: true,
          label: "$$Y$$",
        },
        {
          isCorrect: false,
          label: "$$Z$$",
        },
      ],
    },
  },
};

export default item;
