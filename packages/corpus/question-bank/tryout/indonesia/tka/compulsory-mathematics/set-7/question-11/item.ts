import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{3}{16}\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$\\frac{3}{5}\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$\\frac{3}{4}\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$1\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$\\frac{3}{2}\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
