import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$25\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$30\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$156{,}25\\text{ cm}^2$$",
        },
        {
          correct: true,
          label: "$$150\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$600\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$50\\text{ cm}^2$$",
        },
      ],
    },
  },
};

export default item;
