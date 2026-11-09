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
          correct: true,
          label: "$$y=x^2+4$$",
        },
        {
          correct: false,
          label: "$$y=x^2-1$$",
        },
        {
          correct: false,
          label: "$$y=x^2-4x+8$$",
        },
        {
          correct: false,
          label: "$$y=x^2-8x+20$$",
        },
        {
          correct: false,
          label: "$$y=x^2-6$$",
        },
      ],
    },
  },
};

export default item;
