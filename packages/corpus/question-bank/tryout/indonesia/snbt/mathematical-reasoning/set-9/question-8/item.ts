import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$3:7$$",
        },
        {
          isCorrect: false,
          label: "$$9:14$$",
        },
        {
          isCorrect: true,
          label: "$$19:21$$",
        },
        {
          isCorrect: false,
          label: "$$21:19$$",
        },
        {
          isCorrect: false,
          label: "$$7:3$$",
        },
      ],
    },
  },
};

export default item;
