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
          label: "$$x+1=0$$",
        },
        {
          correct: true,
          label: "$$9x-5y+1=0$$",
        },
        {
          correct: false,
          label: "$$9x-5y-1=0$$",
        },
        {
          correct: false,
          label: "$$x+y-1=0$$",
        },
        {
          correct: false,
          label: "$$5x-9y-1=0$$",
        },
      ],
    },
  },
};

export default item;
