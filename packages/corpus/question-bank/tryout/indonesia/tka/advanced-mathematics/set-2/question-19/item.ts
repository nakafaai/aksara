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
          label: "$$y=-x^2+8x-16$$",
        },
        {
          correct: false,
          label: "$$y=x^2-8x+16$$",
        },
        {
          correct: false,
          label: "$$y=-x^2-4x-4$$",
        },
        {
          correct: true,
          label: "$$y=-x^2+8x-14$$",
        },
        {
          correct: false,
          label: "$$y=x^2-4x+4$$",
        },
      ],
    },
  },
};

export default item;
