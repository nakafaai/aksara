import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1$$",
        },
        {
          correct: true,
          label: "$$\\frac{1}{3}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{2}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{2}\\sqrt{2}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{3}\\sqrt{3}$$",
        },
      ],
    },
  },
};

export default item;
