import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4\\text{ cm}^2$$",
        },
        {
          correct: true,
          label: "$$\\frac{16}{3}\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$8\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$\\frac83\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$6\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$\\frac{32}{3}\\text{ cm}^2$$",
        },
      ],
    },
  },
};

export default item;
