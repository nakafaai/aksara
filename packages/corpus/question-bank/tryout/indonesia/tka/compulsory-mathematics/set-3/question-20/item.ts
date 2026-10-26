import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "trigonometry",
    topic: "trigonometric-ratios",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac18$$",
        },
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
          label: "$$\\frac13$$",
        },
        {
          correct: true,
          label: "$$\\frac16$$",
        },
      ],
    },
  },
};

export default item;
