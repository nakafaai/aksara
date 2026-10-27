import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Namun",
        },
        {
          correct: false,
          label: "Sebelum pengukuran",
        },
        {
          correct: false,
          label: "Sebaliknya",
        },
        {
          correct: true,
          label: "Dalam kondisi tersebut",
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
