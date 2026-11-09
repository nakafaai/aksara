import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$5\\cdot10^{5}$$",
        },
        {
          correct: true,
          label: "$$3\\cdot10^{7}$$",
        },
        {
          correct: false,
          label: "$$9\\cdot10^{3}$$",
        },
        {
          correct: false,
          label: "$$3\\cdot10^{6}$$",
        },
        {
          correct: false,
          label: "$$3\\cdot10^{8}$$",
        },
        {
          correct: false,
          label: "$$9\\cdot10^{4}$$",
        },
      ],
    },
  },
};

export default item;
