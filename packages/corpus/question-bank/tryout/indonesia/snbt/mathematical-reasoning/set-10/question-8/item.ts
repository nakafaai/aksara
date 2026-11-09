import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "train-departures",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "2 menit" },
        { correct: false, label: "6 menit" },
        { correct: false, label: "8 menit" },
        { correct: false, label: "14 menit" },
        { correct: false, label: "18 menit" },
      ],
    },
  },
};

export default item;
