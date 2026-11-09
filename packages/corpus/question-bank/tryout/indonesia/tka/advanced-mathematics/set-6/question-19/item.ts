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
          correct: true,
          label: "$$y=2x^2-2$$",
        },
        {
          correct: false,
          label: "$$y=\\frac12x^2-8$$",
        },
        {
          correct: false,
          label: "$$y=\\frac12x^2-2$$",
        },
        {
          correct: false,
          label: "$$y=4x^2-4$$",
        },
        {
          correct: false,
          label: "$$y=2x^2-4$$",
        },
      ],
    },
  },
};

export default item;
