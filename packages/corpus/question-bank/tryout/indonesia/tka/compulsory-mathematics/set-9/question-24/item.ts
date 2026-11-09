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
          label: "$$\\frac{1}{10}$$",
        },
        {
          correct: false,
          label: "$$\\frac16$$",
        },
        {
          correct: false,
          label: "$$\\frac15$$",
        },
        {
          correct: true,
          label: "$$\\frac{3}{10}$$",
        },
        {
          correct: false,
          label: "$$\\frac13$$",
        },
      ],
    },
  },
};

export default item;
