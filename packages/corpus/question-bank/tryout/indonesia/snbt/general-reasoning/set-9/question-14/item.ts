import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "A, C, B, D, E",
        },
        {
          correct: false,
          label: "D, C, A, E, B",
        },
        {
          correct: false,
          label: "E, D, A, C, B",
        },
        {
          correct: true,
          label: "D, A, C, E, B",
        },
        {
          correct: false,
          label: "A, D, C, B, E",
        },
      ],
    },
  },
};

export default item;
