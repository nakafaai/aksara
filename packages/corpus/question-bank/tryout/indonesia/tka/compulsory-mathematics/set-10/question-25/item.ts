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
          label: "$$\\frac16$$",
        },
        {
          correct: false,
          label: "$$\\frac{5}{18}$$",
        },
        {
          correct: true,
          label: "$$\\frac{11}{36}$$",
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
