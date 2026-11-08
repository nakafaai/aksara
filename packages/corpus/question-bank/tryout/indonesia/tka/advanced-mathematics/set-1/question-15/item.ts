import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "circles",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3x+4y+32=0$$",
        },
        {
          correct: false,
          label: "$$4x-3y-1=0$$",
        },
        {
          correct: false,
          label: "$$3x+4y-7=0$$",
        },
        {
          correct: false,
          label: "$$3x+4y-2=0$$",
        },
        {
          correct: true,
          label: "$$3x+4y-32=0$$",
        },
      ],
    },
  },
};

export default item;
