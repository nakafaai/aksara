import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$-\\frac{3}{2}$$",
        },
        {
          isCorrect: false,
          label: "$$-\\frac{1}{2}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{3}{2}$$",
        },
        {
          isCorrect: true,
          label: "$$-\\frac{5}{2}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{5}{2}$$",
        },
      ],
    },
  },
};

export default item;
