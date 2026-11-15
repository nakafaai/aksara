import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$40\\sqrt3\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$20\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$40\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$20\\sqrt3\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$10\\sqrt3\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$\\frac{40\\sqrt3}{3}\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
