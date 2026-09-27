import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$2-\\sqrt3$$",
        },
        {
          isCorrect: false,
          label: "$$\\sqrt2-1$$",
        },
        {
          isCorrect: false,
          label: "$$1$$",
        },
        {
          isCorrect: false,
          label: "$$\\sqrt2$$",
        },
        {
          isCorrect: true,
          label: "$$2-\\sqrt2$$",
        },
      ],
    },
  },
};

export default item;
