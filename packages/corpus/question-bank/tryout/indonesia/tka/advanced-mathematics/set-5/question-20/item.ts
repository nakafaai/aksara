import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometric-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$x+2y-9=0$$",
        },
        {
          correct: false,
          label: "$$2x-y+3=0$$",
        },
        {
          correct: false,
          label: "$$x-2y+3=0$$",
        },
        {
          correct: true,
          label: "$$2x-y-3=0$$",
        },
        {
          correct: false,
          label: "$$y=x$$",
        },
      ],
    },
  },
};

export default item;
