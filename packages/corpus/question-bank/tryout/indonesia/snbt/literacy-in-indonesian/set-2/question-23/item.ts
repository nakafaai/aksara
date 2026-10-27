import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "(7)",
        },
        {
          correct: false,
          label: "(2)",
        },
        {
          correct: false,
          label: "(5)",
        },
        {
          correct: false,
          label: "(10)",
        },
        {
          correct: false,
          label: "(4)",
        },
      ],
    },
  },
};

export default item;
