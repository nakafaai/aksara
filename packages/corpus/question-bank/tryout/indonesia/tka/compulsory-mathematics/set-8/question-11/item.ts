import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$10\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$15\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$16\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$19{,}2\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
