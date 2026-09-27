import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$13$$",
        },
        {
          isCorrect: true,
          label: "$$21$$",
        },
        {
          isCorrect: false,
          label: "$$17$$",
        },
        {
          isCorrect: false,
          label: "$$25$$",
        },
        {
          isCorrect: false,
          label: "$$29$$",
        },
      ],
    },
  },
};

export default item;
