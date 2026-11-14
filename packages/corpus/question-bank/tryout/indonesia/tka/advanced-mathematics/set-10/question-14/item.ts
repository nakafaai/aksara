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
          label: "$$x^2+y^2-2x+8y-8=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2+2x-8y+17=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2+2x-8y-32=0$$",
        },
        {
          correct: true,
          label: "$$x^2+y^2+2x-8y-8=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2+2x-8y+12=0$$",
        },
      ],
    },
  },
};

export default item;
