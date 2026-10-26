import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$64+6\\pi^2$$",
        },
        {
          correct: false,
          label: "$$64+18\\pi^2$$",
        },
        {
          correct: true,
          label: "$$64+9\\pi^2$$",
        },
        {
          correct: false,
          label: "$$8+3\\pi$$",
        },
        {
          correct: false,
          label: "$$8+9\\pi$$",
        },
      ],
    },
  },
};

export default item;
