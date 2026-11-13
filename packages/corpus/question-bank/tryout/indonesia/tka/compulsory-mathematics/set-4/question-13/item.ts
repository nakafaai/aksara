import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "geometry-transformations",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3x+y-7=0$$",
        },
        {
          correct: true,
          label: "$$3x-y-14=0$$",
        },
        {
          correct: false,
          label: "$$3x-4y-2=0$$",
        },
        {
          correct: false,
          label: "$$x-y-2=0$$",
        },
        {
          correct: false,
          label: "$$x-5y+14=0$$",
        },
      ],
    },
  },
};

export default item;
