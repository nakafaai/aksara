import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$15$$",
        },
        {
          isCorrect: false,
          label: "$$20$$",
        },
        {
          isCorrect: false,
          label: "$$25$$",
        },
        {
          isCorrect: false,
          label: "$$35$$",
        },
        {
          isCorrect: true,
          label: "$$30$$",
        },
      ],
    },
  },
};

export default item;
