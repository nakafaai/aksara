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
          correct: false,
          label: "(2) dan (4)",
        },
        {
          correct: true,
          label: "(1) dan (3)",
        },
        {
          correct: false,
          label: "Hanya (4)",
        },
        {
          correct: false,
          label: "Keempat bilangan",
        },
      ],
    },
  },
};

export default item;
