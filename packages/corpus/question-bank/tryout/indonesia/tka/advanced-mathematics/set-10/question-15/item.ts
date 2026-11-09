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
          label: "$$x^2+y^2+6x+8y=0$$",
        },
        {
          correct: true,
          label: "$$x^2+y^2-6x-8y=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2-6x-6y=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2-6x-9y=0$$",
        },
        {
          correct: false,
          label: "$$x^2+y^2-6x-8y-25=0$$",
        },
      ],
    },
  },
};

export default item;
