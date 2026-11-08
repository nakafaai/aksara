import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$y=-2x-4$$",
        },
        {
          correct: false,
          label: "$$y=-2x+4$$",
        },
        {
          correct: false,
          label: "$$y=2x-4$$",
        },
        {
          correct: true,
          label: "$$y=-\\frac12x-2$$",
        },
        {
          correct: false,
          label: "$$y=-\\frac12x+2$$",
        },
      ],
    },
  },
};

export default item;
