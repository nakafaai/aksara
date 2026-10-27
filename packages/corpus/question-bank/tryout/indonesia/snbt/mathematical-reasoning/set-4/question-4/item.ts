import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\frac{3\\sqrt{6}}{2}\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$\\frac{3\\sqrt{3}}{2}\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{2}\\sqrt{3}\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{3}\\sqrt{3}\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$\\frac{3}{2}\\sqrt{2}\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
