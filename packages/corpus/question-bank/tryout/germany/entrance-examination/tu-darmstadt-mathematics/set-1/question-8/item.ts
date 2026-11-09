import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2^{10}$$",
        },
        {
          correct: false,
          label: "$$3^6$$",
        },
        {
          correct: false,
          label: "$$5^4$$",
        },
        {
          correct: false,
          label: "$$10^3$$",
        },
        {
          correct: true,
          label: "$$6^4$$",
        },
        {
          correct: false,
          label: "$$7^3$$",
        },
      ],
    },
  },
};

export default item;
