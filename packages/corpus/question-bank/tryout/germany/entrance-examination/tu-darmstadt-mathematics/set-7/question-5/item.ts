import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0{,}6\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$60\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$6\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$54\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$30\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$6\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
