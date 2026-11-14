import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "game-energy",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "pukul 12.00" },
        { correct: false, label: "pukul 12.15" },
        { correct: false, label: "pukul 12.40" },
        { correct: true, label: "pukul 12.45" },
        { correct: false, label: "pukul 14.00" },
      ],
    },
  },
};

export default item;
