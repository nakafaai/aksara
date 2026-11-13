import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "probability",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac25$$",
        },
        {
          correct: false,
          label: "$$\\frac1{20}$$",
        },
        {
          correct: true,
          label: "$$\\frac{10}{19}$$",
        },
        {
          correct: false,
          label: "$$\\frac1{50}$$",
        },
        {
          correct: false,
          label: "$$\\frac9{19}$$",
        },
      ],
    },
  },
};

export default item;
