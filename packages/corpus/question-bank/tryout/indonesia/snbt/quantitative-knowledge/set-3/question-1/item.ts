import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$16$$",
        },
        {
          isCorrect: false,
          label: "$$20$$",
        },
        {
          isCorrect: false,
          label: "$$22$$",
        },
        {
          isCorrect: false,
          label: "$$24$$",
        },
        {
          isCorrect: true,
          label: "$$18$$",
        },
      ],
    },
  },
};

export default item;
