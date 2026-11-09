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
          label: "$$2x-y-1=0$$",
        },
        {
          correct: true,
          label: "$$2x+y-1=0$$",
        },
        {
          correct: false,
          label: "$$2x+y+1=0$$",
        },
        {
          correct: false,
          label: "$$2x+y+3=0$$",
        },
        {
          correct: false,
          label: "$$2x+y+7=0$$",
        },
      ],
    },
  },
};

export default item;
