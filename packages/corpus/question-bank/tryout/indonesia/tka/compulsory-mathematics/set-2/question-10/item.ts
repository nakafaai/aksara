import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$76\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$84\\text{ cm}^2$$",
        },
        {
          correct: true,
          label: "$$100\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$108\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$120\\text{ cm}^2$$",
        },
      ],
    },
  },
};

export default item;
