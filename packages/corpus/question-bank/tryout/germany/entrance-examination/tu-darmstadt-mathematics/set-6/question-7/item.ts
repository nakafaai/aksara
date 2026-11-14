import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$50$$",
        },
        {
          correct: true,
          label: "$$200$$",
        },
        {
          correct: false,
          label: "$$2\\cdot10^{-2}$$",
        },
        {
          correct: false,
          label: "$$2\\cdot10^{-12}$$",
        },
        {
          correct: false,
          label: "$$2\\cdot10^{12}$$",
        },
        {
          correct: false,
          label: "$$5\\cdot10^{-3}$$",
        },
      ],
    },
  },
};

export default item;
