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
          label: "$$\\frac{252}{11}$$",
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
          isCorrect: false,
          label: "$$25$$",
        },
      ],
    },
  },
};

export default item;
