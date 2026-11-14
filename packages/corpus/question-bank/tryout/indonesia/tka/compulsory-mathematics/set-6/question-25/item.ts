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
          correct: true,
          label: "$$\\frac{6}{19}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{3}$$",
        },
        {
          correct: false,
          label: "$$\\frac{7}{19}$$",
        },
        {
          correct: false,
          label: "$$\\frac{13}{19}$$",
        },
        {
          correct: false,
          label: "$$\\frac{19}{21}$$",
        },
      ],
    },
  },
};

export default item;
