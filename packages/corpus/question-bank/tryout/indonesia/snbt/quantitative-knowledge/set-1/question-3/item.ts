import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "(1), (2), dan (3)",
        },
        {
          correct: true,
          label: "(1) dan (3)",
        },
        {
          correct: false,
          label: "(2) dan (4)",
        },
        {
          correct: false,
          label: "(4)",
        },
        {
          correct: false,
          label: "(1), (2), (3), dan (4)",
        },
      ],
    },
  },
};

export default item;
