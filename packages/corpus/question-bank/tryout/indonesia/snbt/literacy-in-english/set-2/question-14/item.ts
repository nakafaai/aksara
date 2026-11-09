import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "How to calculate the construction cost of an office",
        },
        {
          correct: false,
          label: "Why email should replace every meeting",
        },
        {
          correct: false,
          label: "The history of corporate architecture",
        },
        {
          correct: false,
          label: "How to decorate a private office",
        },
        {
          correct: true,
          label: "Evidence and trade-offs in choosing an office layout",
        },
      ],
    },
  },
};

export default item;
