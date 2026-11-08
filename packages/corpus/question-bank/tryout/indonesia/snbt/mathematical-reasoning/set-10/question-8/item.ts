import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "train-departures",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "4 menit" },
        { correct: false, label: "6 menit" },
        { correct: false, label: "8 menit" },
        { correct: false, label: "10 menit" },
        { correct: false, label: "12 menit" },
      ],
    },
  },
};

export default item;
