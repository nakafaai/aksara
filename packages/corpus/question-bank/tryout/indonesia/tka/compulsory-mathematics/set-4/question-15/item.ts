import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "measurement",
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
          correct: false,
          label: "$$26{,}4\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$42\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$44\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
