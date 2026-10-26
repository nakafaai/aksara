import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Selanjutnya",
        },
        {
          correct: false,
          label: "Namun",
        },
        {
          correct: false,
          label: "Oleh karena itu",
        },
        {
          correct: false,
          label: "Sebaliknya",
        },
        {
          correct: false,
          label: "Seandainya",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
