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
          label: "$$14\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$22\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$44\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$49\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$88\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
