import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$14\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$12\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$15\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$10\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$5\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$13\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
