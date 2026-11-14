import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "river-gauge",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Pukul 11.20" },
        { correct: true, label: "Pukul 13.15" },
        { correct: false, label: "Pukul 13.25" },
        { correct: false, label: "Pukul 14.00" },
        { correct: false, label: "Sesudah pukul 14.00" },
      ],
    },
  },
};

export default item;
