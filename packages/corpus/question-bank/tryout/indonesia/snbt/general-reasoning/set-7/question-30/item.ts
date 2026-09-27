import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\frac13$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac25$$",
        },
        {
          isCorrect: true,
          label: "$$\\frac12$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac35$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac23$$",
        },
      ],
    },
  },
};

export default item;
