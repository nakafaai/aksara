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
          correct: true,
          label: "$$108\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$135\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$180\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$216\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$270\\text{ cm}^2$$",
        },
      ],
    },
  },
};

export default item;
