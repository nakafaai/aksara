import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$3\\sqrt{2}$$",
        },
        {
          isCorrect: false,
          label: "$$2\\sqrt{2}$$",
        },
        {
          isCorrect: false,
          label: "$$\\sqrt{2}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{1}{2}\\sqrt{2}$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac{1}{3}\\sqrt{2}$$",
        },
      ],
    },
  },
};

export default item;
