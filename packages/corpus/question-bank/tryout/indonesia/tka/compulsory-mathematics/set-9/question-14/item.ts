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
          label: "$$2x+3y=3$$",
        },
        {
          correct: false,
          label: "$$3x+2y=12$$",
        },
        {
          correct: false,
          label: "$$2x+3y=24$$",
        },
        {
          correct: false,
          label: "$$4x+6y=12$$",
        },
        {
          correct: true,
          label: "$$2x+3y=12$$",
        },
      ],
    },
  },
};

export default item;
