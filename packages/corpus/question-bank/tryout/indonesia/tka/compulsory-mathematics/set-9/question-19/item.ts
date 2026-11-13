import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$3{,}5\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$8\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$12\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$14\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
