import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\frac1{42}$$",
        },
        {
          isCorrect: true,
          label: "$$\\frac1{35}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac1{28}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac1{21}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac1{14}$$",
        },
      ],
    },
  },
};

export default item;
