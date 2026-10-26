import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$3\\sqrt{2}$$",
        },
        {
          correct: false,
          label: "$$2\\sqrt{2}$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{2}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{2}\\sqrt{2}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{3}\\sqrt{2}$$",
        },
      ],
    },
  },
};

export default item;
