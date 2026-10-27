import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$90$$",
        },
        {
          correct: false,
          label: "$$100$$",
        },
        {
          correct: false,
          label: "$$120$$",
        },
        {
          correct: true,
          label: "$$110$$",
        },
        {
          correct: false,
          label: "$$130$$",
        },
      ],
    },
  },
};

export default item;
