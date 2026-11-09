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
          label: "$$\\frac{1}{36}$$",
        },
        {
          correct: false,
          label: "$$\\frac29$$",
        },
        {
          correct: true,
          label: "$$\\frac14$$",
        },
        {
          correct: false,
          label: "$$\\frac{19}{36}$$",
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
