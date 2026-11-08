import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "probability",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\frac{6}{11}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{22}$$",
        },
        {
          correct: false,
          label: "$$\\frac{9}{22}$$",
        },
        {
          correct: false,
          label: "$$\\frac{9}{16}$$",
        },
        {
          correct: false,
          label: "$$\\frac34$$",
        },
      ],
    },
  },
};

export default item;
