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
          correct: false,
          label: "$$\\frac{1}{52}$$",
        },
        {
          correct: false,
          label: "$$\\frac{1}{26}$$",
        },
        {
          correct: true,
          label: "$$\\frac{1}{13}$$",
        },
        {
          correct: false,
          label: "$$\\frac14$$",
        },
        {
          correct: false,
          label: "$$\\frac{4}{13}$$",
        },
      ],
    },
  },
};

export default item;
