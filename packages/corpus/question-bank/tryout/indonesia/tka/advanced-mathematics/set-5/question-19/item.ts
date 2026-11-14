import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "geometric-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2x-y+3=0$$",
        },
        {
          correct: true,
          label: "$$2x-5y+3=0$$",
        },
        {
          correct: false,
          label: "$$2x+3y+3=0$$",
        },
        {
          correct: false,
          label: "$$4x-y+3=0$$",
        },
        {
          correct: false,
          label: "$$2x-5y-3=0$$",
        },
      ],
    },
  },
};

export default item;
