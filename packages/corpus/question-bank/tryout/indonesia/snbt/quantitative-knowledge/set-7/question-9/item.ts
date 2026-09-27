import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$96$$",
        },
        {
          isCorrect: false,
          label: "$$120$$",
        },
        {
          isCorrect: false,
          label: "$$144$$",
        },
        {
          isCorrect: true,
          label: "$$72$$",
        },
        {
          isCorrect: false,
          label: "$$168$$",
        },
      ],
    },
  },
};

export default item;
