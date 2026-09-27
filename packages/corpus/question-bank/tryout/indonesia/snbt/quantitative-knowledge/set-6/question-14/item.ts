import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$-\\frac{3}{5}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{1}{5}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{4}{3}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{2}{3}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{3}{5}$$",
        },
      ],
    },
  },
};

export default item;
