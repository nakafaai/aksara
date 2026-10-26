import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Oleh karena itu",
        },
        {
          correct: false,
          label: "Demikian pula",
        },
        {
          correct: true,
          label: "Namun",
        },
        {
          correct: false,
          label: "Setelah itu",
        },
        {
          correct: false,
          label: "Bahkan",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
