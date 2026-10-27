import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Sebaliknya",
        },
        {
          correct: false,
          label: "Oleh karena itu",
        },
        {
          correct: true,
          label: "Selain itu",
        },
        {
          correct: false,
          label: "Namun",
        },
        {
          correct: false,
          label: "Misalnya",
        },
      ],
    },
  },
};

export default item;
