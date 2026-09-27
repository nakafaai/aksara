import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$14$$",
        },
        {
          isCorrect: false,
          label: "$$15$$",
        },
        {
          isCorrect: true,
          label: "$$17$$",
        },
        {
          isCorrect: false,
          label: "$$16$$",
        },
        {
          isCorrect: false,
          label: "$$18$$",
        },
      ],
    },
  },
};

export default item;
