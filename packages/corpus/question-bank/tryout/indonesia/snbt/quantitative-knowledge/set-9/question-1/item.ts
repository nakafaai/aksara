import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$7\\pi\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$10\\pi\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$12\\pi\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$16\\pi\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$14\\pi\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
