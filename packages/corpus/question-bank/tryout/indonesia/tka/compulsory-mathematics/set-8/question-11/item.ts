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
          label: "$$7\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$24\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$25\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$32\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$38\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
