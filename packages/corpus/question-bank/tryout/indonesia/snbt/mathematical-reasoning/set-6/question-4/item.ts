import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "water-tower",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Pukul 06.20" },
        { correct: false, label: "Pukul 06.25" },
        { correct: true, label: "Pukul 06.40" },
        { correct: false, label: "Pukul 07.00" },
        { correct: false, label: "Pukul 07.40" },
      ],
    },
  },
};

export default item;
