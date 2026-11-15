import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$15\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$\\frac{50}{3}\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$\\frac{40}{3}\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$20\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$7{,}5\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$\\frac{31}{3}\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
