import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\left(50-25\\sqrt3\\right)\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$\\left(100-50\\sqrt3\\right)\\text{ cm}^2$$",
        },
        { correct: false, label: "$$25\\text{ cm}^2$$" },
        {
          correct: false,
          label: "$$\\left(50\\sqrt3-50\\right)\\text{ cm}^2$$",
        },
        { correct: false, label: "$$25\\sqrt3\\text{ cm}^2$$" },
      ],
    },
  },
};

export default item;
