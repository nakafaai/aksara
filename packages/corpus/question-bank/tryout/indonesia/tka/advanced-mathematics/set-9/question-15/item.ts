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
          correct: true,
          label: "$$x^2+y^2-4x-8y+11=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2-4x-8y-16=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2+4x+8y+11=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2-4x-8y+17=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2-4x-8y+4=0$$",
        },
      ],
    },
  },
};

export default item;
