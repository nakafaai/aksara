import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$69$$",
        },
        {
          isCorrect: false,
          label: "$$54$$",
        },
        {
          isCorrect: false,
          label: "$$60$$",
        },
        {
          isCorrect: false,
          label: "$$66$$",
        },
        {
          isCorrect: false,
          label: "$$72$$",
        },
      ],
    },
  },
};

export default item;
