import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$\\frac1{56}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac1{72}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac1{63}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac1{48}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac1{42}$$",
        },
      ],
    },
  },
};

export default item;
