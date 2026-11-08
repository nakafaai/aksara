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
          label: "$$\\frac15$$",
        },
        {
          correct: false,
          label: "$$\\frac14$$",
        },
        {
          correct: false,
          label: "$$\\frac{9}{20}$$",
        },
        {
          correct: true,
          label: "$$\\frac{11}{20}$$",
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
