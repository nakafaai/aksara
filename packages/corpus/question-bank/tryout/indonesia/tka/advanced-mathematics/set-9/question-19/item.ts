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
          label: "$$x-2y+4=0$$",
        },
        {
          correct: false,
          label: "$$2x+y-4=0$$",
        },
        {
          correct: false,
          label: "$$x-2y=0$$",
        },
        {
          correct: true,
          label: "$$x-2y+2=0$$",
        },
        {
          correct: false,
          label: "$$x-2y-2=0$$",
        },
      ],
    },
  },
};

export default item;
