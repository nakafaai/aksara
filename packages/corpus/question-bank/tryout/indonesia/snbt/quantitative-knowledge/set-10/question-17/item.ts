import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{1}{3}$$",
        },
        {
          correct: false,
          label: "$$\\frac{2}{3}$$",
        },
        {
          correct: true,
          label: "$$0{,}5$$",
        },
        {
          correct: false,
          label: "$$0{,}333$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{4}$$",
        },
      ],
    },
  },
};

export default item;
