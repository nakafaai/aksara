import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$20$$",
        },
        {
          isCorrect: true,
          label: "$$24$$",
        },
        {
          isCorrect: false,
          label: "$$22$$",
        },
        {
          isCorrect: false,
          label: "$$25$$",
        },
        {
          isCorrect: false,
          label: "$$26$$",
        },
      ],
    },
  },
};

export default item;
