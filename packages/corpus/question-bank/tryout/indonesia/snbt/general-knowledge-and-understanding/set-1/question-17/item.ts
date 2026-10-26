import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "paman.",
        },
        {
          correct: false,
          label: "bangsa.",
        },
        {
          correct: false,
          label: "pahlawan.",
        },
        {
          correct: true,
          label: "gugur.",
        },
        {
          correct: false,
          label: "musuh.",
        },
      ],
    },
  },
};

export default item;
