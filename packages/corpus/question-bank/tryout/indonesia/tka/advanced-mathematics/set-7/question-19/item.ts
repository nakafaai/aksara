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
          label: "$$x^2+y^2-4x+2y+1=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2+2y-3=0$$",
        },
        {
          correct: true,
          label: "$$x^2+y^2-4x-6y+9=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2-4x-2y+1=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2-4x-6y+5=0$$",
        },
      ],
    },
  },
};

export default item;
