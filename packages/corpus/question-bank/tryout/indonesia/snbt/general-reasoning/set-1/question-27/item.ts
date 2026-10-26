import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$105$$",
        },
        {
          correct: false,
          label: "$$95$$",
        },
        {
          correct: false,
          label: "$$100$$",
        },
        {
          correct: false,
          label: "$$110$$",
        },
        {
          correct: false,
          label: "$$115$$",
        },
      ],
    },
  },
};

export default item;
