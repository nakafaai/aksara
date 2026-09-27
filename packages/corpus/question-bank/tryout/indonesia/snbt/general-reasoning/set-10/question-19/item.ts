import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$75\\frac13$$",
        },
        {
          isCorrect: false,
          label: "$$74$$",
        },
        {
          isCorrect: false,
          label: "$$75$$",
        },
        {
          isCorrect: false,
          label: "$$76$$",
        },
        {
          isCorrect: false,
          label: "$$76\\frac23$$",
        },
      ],
    },
  },
};

export default item;
