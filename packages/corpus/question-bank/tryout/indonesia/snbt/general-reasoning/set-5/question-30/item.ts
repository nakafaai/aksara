import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$68$$",
        },
        {
          isCorrect: false,
          label: "$$70$$",
        },
        {
          isCorrect: false,
          label: "$$74$$",
        },
        {
          isCorrect: true,
          label: "$$72$$",
        },
        {
          isCorrect: false,
          label: "$$82$$",
        },
      ],
    },
  },
};

export default item;
