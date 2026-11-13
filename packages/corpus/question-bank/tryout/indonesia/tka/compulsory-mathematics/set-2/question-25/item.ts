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
          label: "$$\\frac{1}{6}$$",
        },
        {
          correct: false,
          label: "$$\\frac{19}{60}$$",
        },
        {
          correct: false,
          label: "$$\\frac{9}{22}$$",
        },
        {
          correct: false,
          label: "$$\\frac{18}{37}$$",
        },
        {
          correct: true,
          label: "$$\\frac{10}{19}$$",
        },
      ],
    },
  },
};

export default item;
