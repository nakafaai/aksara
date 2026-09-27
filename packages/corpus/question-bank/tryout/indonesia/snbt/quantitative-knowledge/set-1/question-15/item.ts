import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$16$$",
        },
        {
          isCorrect: false,
          label: "$$8$$",
        },
        {
          isCorrect: false,
          label: "$$12$$",
        },
        {
          isCorrect: false,
          label: "$$18$$",
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
