import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$12 \\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$18 \\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$10 \\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$20 \\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$22 \\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
