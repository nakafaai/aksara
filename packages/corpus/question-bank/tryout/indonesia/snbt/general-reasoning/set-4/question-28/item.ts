import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\frac1{30}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac1{24}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac1{18}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac1{15}$$",
        },
        {
          isCorrect: true,
          label: "$$\\frac1{20}$$",
        },
      ],
    },
  },
};

export default item;
