import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac12$$",
        },
        {
          correct: false,
          label: "$$1$$",
        },
        {
          correct: false,
          label: "$$1\\frac12$$",
        },
        {
          correct: true,
          label: "$$2$$",
        },
        {
          correct: false,
          label: "$$8$$",
        },
      ],
    },
  },
};

export default item;
