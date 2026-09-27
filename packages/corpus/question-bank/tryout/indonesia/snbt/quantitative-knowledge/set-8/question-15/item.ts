import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$-\\frac{1008}{2015}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{1}{2015}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{1007}{2015}$$",
        },
        {
          isCorrect: true,
          label: "$$-\\frac{1007}{2015}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{1008}{2015}$$",
        },
      ],
    },
  },
};

export default item;
