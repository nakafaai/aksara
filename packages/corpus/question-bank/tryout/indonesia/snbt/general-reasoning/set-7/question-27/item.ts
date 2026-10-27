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
          correct: false,
          label: "$$\\frac{21}{20}$$",
        },
        {
          correct: false,
          label: "$$\\frac{23}{20}$$",
        },
        {
          correct: true,
          label: "$$\\frac{11}{10}$$",
        },
        {
          correct: false,
          label: "$$\\frac65$$",
        },
      ],
    },
  },
};

export default item;
