import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$18$$",
        },
        {
          isCorrect: false,
          label: "$$13$$",
        },
        {
          isCorrect: false,
          label: "$$9$$",
        },
        {
          isCorrect: false,
          label: "$$7$$",
        },
        {
          isCorrect: true,
          label: "$$14$$",
        },
      ],
    },
  },
};

export default item;
