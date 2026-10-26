import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "menyaingi.",
        },
        {
          correct: false,
          label: "menirukan.",
        },
        {
          correct: false,
          label: "mengikuti.",
        },
        {
          correct: true,
          label: "mirip dengan.",
        },
        {
          correct: false,
          label: "menggantikan.",
        },
      ],
    },
  },
};

export default item;
