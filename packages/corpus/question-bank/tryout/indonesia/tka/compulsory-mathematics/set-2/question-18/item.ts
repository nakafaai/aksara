import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$25\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$16\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$14\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$12\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$6\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
