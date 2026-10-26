import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$288$$",
        },
        {
          correct: false,
          label: "$$312$$",
        },
        {
          correct: false,
          label: "$$360$$",
        },
        {
          correct: false,
          label: "$$384$$",
        },
        {
          correct: true,
          label: "$$336$$",
        },
      ],
    },
  },
};

export default item;
