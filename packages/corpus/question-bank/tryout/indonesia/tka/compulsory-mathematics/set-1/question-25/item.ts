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
          label: "$$\\frac{1}{21}$$",
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
          correct: false,
          label: "$$\\frac{25}{42}$$",
        },
        {
          correct: true,
          label: "$$\\frac{17}{42}$$",
        },
      ],
    },
  },
};

export default item;
