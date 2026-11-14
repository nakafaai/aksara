import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "water-tower",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Pukul 06.00" },
        { correct: false, label: "Pukul 06.56" },
        { correct: false, label: "Pukul 07.16" },
        { correct: true, label: "Pukul 07.36" },
        { correct: false, label: "Pukul 08.16" },
      ],
    },
  },
};

export default item;
