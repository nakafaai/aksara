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
          label: "$$x+y-2=0$$",
        },
        {
          correct: true,
          label: "$$7x-17y+2=0$$",
        },
        {
          correct: false,
          label: "$$7x-17y-2=0$$",
        },
        {
          correct: false,
          label: "$$5x+13y-2=0$$",
        },
        {
          correct: false,
          label: "$$17x-7y-2=0$$",
        },
      ],
    },
  },
};

export default item;
