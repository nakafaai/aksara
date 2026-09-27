import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

// Date: 2025-11-22
const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$8$$",
        },
        {
          isCorrect: false,
          label: "$$10$$",
        },
        {
          isCorrect: true,
          label: "$$9$$",
        },
        {
          isCorrect: false,
          label: "$$11$$",
        },
        {
          isCorrect: false,
          label: "$$12$$",
        },
      ],
    },
  },
};

export default item;
