import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "delivery-robot",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "2.200 m" },
        { correct: false, label: "2.400 m" },
        { correct: false, label: "2.600 m" },
        { correct: false, label: "2.800 m" },
        { correct: false, label: "3.200 m" },
      ],
    },
  },
};

export default item;
