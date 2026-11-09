import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "sprint-times",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "14,3 detik" },
        { correct: false, label: "14,4 detik" },
        { correct: false, label: "14,5 detik" },
        { correct: false, label: "14,6 detik" },
        { correct: false, label: "14,7 detik" },
      ],
    },
  },
};

export default item;
