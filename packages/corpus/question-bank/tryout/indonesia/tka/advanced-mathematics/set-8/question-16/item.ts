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
          label: "$$x^2+y^2-12x-5y=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2-4x-4y=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2-8x-8y+16=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2+4x+4y+4=0$$",
        },
        {
          correct: true,
          label: "$$x^2+y^2-4x-4y+4=0$$",
        },
      ],
    },
  },
};

export default item;
