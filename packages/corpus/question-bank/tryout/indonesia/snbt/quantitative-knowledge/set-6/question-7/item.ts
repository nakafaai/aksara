import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$\\frac{5}{3} \\text{ dan } -1$$",
        },
        {
          isCorrect: false,
          label: "$$5 \\text{ dan } -3$$",
        },
        {
          isCorrect: false,
          label: "$$-5 \\text{ dan } 3$$",
        },
        {
          isCorrect: false,
          label: "$$-\\frac{5}{3} \\text{ dan } 1$$",
        },
        {
          isCorrect: false,
          label: "$$5 \\text{ dan } -1$$",
        },
      ],
    },
  },
};

export default item;
