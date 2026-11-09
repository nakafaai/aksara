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
          label: "$$x^2+y^2-2x+6y-26=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2-2x+6y-8=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2+2x-6y-26=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2-2x+6y+1=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2-4x+12y+4=0$$",
        },
      ],
    },
  },
};

export default item;
