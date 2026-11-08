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
          label: "$$\\frac{3}{28}$$",
        },
        {
          correct: false,
          label: "$$\\frac{5}{14}$$",
        },
        {
          correct: false,
          label: "$$\\frac12$$",
        },
        {
          correct: true,
          label: "$$\\frac{15}{28}$$",
        },
        {
          correct: false,
          label: "$$\\frac{25}{28}$$",
        },
      ],
    },
  },
};

export default item;
