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
          label: "$$3x+y-11=0$$",
        },
        {
          correct: true,
          label: "$$3x+y+9=0$$",
        },
        {
          correct: false,
          label: "$$3x+y+11=0$$",
        },
        {
          correct: false,
          label: "$$x-3y-17=0$$",
        },
        {
          correct: false,
          label: "$$3x+y-1=0$$",
        },
      ],
    },
  },
};

export default item;
