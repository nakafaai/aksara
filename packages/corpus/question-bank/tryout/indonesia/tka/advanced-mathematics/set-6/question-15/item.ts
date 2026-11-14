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
          label: "$$x^2+y^2+6x+4y+5=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2-6x-4y+21=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2-6x-4y+9=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2-6x-8y+21=0$$",
        },
        {
          correct: true,
          label: "$$x^2+y^2-6x-4y+5=0$$",
        },
      ],
    },
  },
};

export default item;
