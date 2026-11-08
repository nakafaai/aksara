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
          label: "$$2x-3y-6=0$$",
        },
        {
          correct: false,
          label: "$$2x-3y+6=0$$",
        },
        {
          correct: false,
          label: "$$3x-2y-6=0$$",
        },
        {
          correct: false,
          label: "$$3x+2y+6=0$$",
        },
        {
          correct: true,
          label: "$$3x+2y-6=0$$",
        },
      ],
    },
  },
};

export default item;
