import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$188$$",
        },
        {
          isCorrect: false,
          label: "$$220$$",
        },
        {
          isCorrect: false,
          label: "$$300$$",
        },
        {
          isCorrect: true,
          label: "$$246$$",
        },
        {
          isCorrect: false,
          label: "$$306$$",
        },
      ],
    },
  },
};

export default item;
