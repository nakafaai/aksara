import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{27\\sqrt{6}}{2}\\text{ cm}^2$$",
        },
        {
          correct: true,
          label: "$$\\frac{27\\sqrt{5}}{2}\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$\\frac{27\\sqrt{3}}{2}\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$\\frac{27\\sqrt{2}}{2}\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$27\\text{ cm}^2$$",
        },
      ],
    },
  },
};

export default item;
