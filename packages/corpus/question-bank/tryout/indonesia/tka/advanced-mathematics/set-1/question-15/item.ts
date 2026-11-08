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
          label: "$$4x+3y+34=0$$",
        },
        {
          correct: false,
          label: "$$3x-4y+12=0$$",
        },
        {
          correct: false,
          label: "$$4x+3y-9=0$$",
        },
        {
          correct: false,
          label: "$$4x+3y-4=0$$",
        },
        {
          correct: true,
          label: "$$4x+3y-34=0$$",
        },
      ],
    },
  },
};

export default item;
