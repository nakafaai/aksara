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
          label: "$$x=-y^2+2y$$",
        },
        {
          correct: false,
          label: "$$x=y^2+2y$$",
        },
        {
          correct: false,
          label: "$$x=y^2-2y$$",
        },
        {
          correct: false,
          label: "$$x=-y^2-2y$$",
        },
        {
          correct: false,
          label: "$$y=-x^2+2x$$",
        },
      ],
    },
  },
};

export default item;
