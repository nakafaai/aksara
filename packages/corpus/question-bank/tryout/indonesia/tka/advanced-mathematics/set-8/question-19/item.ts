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
          label: "$$x+2y-12=0$$",
        },
        {
          correct: false,
          label: "$$x+2y-4=0$$",
        },
        {
          correct: false,
          label: "$$x+2y-14=0$$",
        },
        {
          correct: true,
          label: "$$x+2y-8=0$$",
        },
        {
          correct: false,
          label: "$$3x+6y-4=0$$",
        },
      ],
    },
  },
};

export default item;
