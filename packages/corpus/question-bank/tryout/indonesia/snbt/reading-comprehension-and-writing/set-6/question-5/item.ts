import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Oleh sebab itu",
        },
        {
          correct: false,
          label: "Bahkan",
        },
        {
          correct: true,
          label: "Sebaliknya",
        },
        {
          correct: false,
          label: "Sebelumnya",
        },
        {
          correct: false,
          label: "Sesudahnya",
        },
      ],
    },
  },
};

export default item;
