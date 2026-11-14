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
          label: "$$x^2+y^2+10x-6y+30=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2-8x-6y+21=0$$",
        },
        {
          correct: true,
          label: "$$x^2+y^2-14x-6y+54=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2-6x-6y+14=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2-14x-6y+42=0$$",
        },
      ],
    },
  },
};

export default item;
