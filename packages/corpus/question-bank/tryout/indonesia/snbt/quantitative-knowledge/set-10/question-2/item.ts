import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$90 - x$$",
        },
        {
          correct: false,
          label: "$$90 - 2x$$",
        },
        {
          correct: false,
          label: "$$180 - x$$",
        },
        {
          correct: false,
          label: "Tidak diketahui",
        },
        {
          correct: true,
          label: "$$180 - 2x$$",
        },
      ],
    },
  },
};

export default item;
