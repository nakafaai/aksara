import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "pool-pumps",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "3,6 jam" },
        { correct: true, label: "4,5 jam" },
        { correct: false, label: "6 jam" },
        { correct: false, label: "7,5 jam" },
        { correct: false, label: "11 jam" },
      ],
    },
  },
};

export default item;
