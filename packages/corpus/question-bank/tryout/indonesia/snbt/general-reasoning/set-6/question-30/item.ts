import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$8$$",
        },
        {
          isCorrect: false,
          label: "$$9$$",
        },
        {
          isCorrect: false,
          label: "$$10$$",
        },
        {
          isCorrect: true,
          label: "$$\\frac{100}{11}$$",
        },
        {
          isCorrect: false,
          label: "$$11$$",
        },
      ],
    },
  },
};

export default item;
