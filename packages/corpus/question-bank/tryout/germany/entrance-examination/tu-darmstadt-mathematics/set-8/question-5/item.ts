import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$25\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$40\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$15\\text{ cm}^2$$",
        },
        {
          correct: true,
          label: "$$20\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$10\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$30\\text{ cm}^2$$",
        },
      ],
    },
  },
};

export default item;
