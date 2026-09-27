import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$10$$",
        },
        {
          isCorrect: false,
          label: "$$16$$",
        },
        {
          isCorrect: false,
          label: "$$18$$",
        },
        {
          isCorrect: true,
          label: "$$20$$",
        },
        {
          isCorrect: false,
          label: "$$24$$",
        },
      ],
    },
  },
};

export default item;
