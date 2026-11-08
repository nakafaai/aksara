import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "circles",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$x^2+y^2+6x-4y-3=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2-6x+4y+9=0$$",
        },
        {
          correct: true,
          label: "$$x^2+y^2-6x+4y-3=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2-6x+4y-7=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2-6x+4y-12=0$$",
        },
      ],
    },
  },
};

export default item;
