import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$10\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$7{,}5\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$6\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$5\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$6{,}25\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$8\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
