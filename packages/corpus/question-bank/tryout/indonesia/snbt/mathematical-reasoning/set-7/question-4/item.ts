import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "battery-drain",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Pukul 22.30" },
        { correct: false, label: "Pukul 22.46" },
        { correct: true, label: "Pukul 23.26" },
        { correct: false, label: "Pukul 23.35" },
        { correct: false, label: "Pukul 23.50" },
      ],
    },
  },
};

export default item;
