import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
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
};

export default item;
