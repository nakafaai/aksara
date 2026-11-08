import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1{,}2\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$4{,}5\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$6\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$7{,}5\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$9\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$10\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
