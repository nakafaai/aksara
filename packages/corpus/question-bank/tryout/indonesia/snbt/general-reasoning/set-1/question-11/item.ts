import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0 \\leq x \\leq 30$$",
        },
        {
          correct: true,
          label: "$$30 \\leq x \\leq 40$$",
        },
        {
          correct: false,
          label: "$$30 \\leq x \\leq 35$$",
        },
        {
          correct: false,
          label: "$$20 \\leq x \\leq 30$$",
        },
        {
          correct: false,
          label: "Tidak dapat ditentukan",
        },
      ],
    },
  },
};

export default item;
