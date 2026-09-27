import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$12:13$$",
        },
        {
          isCorrect: false,
          label: "$$13:14$$",
        },
        {
          isCorrect: false,
          label: "$$7:6$$",
        },
        {
          isCorrect: true,
          label: "$$14:13$$",
        },
        {
          isCorrect: false,
          label: "$$15:13$$",
        },
      ],
    },
  },
};

export default item;
