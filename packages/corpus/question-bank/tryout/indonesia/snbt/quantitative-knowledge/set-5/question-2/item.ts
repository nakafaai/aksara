import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\frac{15}{2}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{9}{7}$$",
        },
        {
          isCorrect: true,
          label: "$$-3$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{5}{2}$$",
        },
        {
          isCorrect: false,
          label: "$$-2$$",
        },
      ],
    },
  },
};

export default item;
