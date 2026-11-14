import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "parking-fees",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "pukul 01.00" },
        { correct: false, label: "pukul 01.30" },
        { correct: false, label: "pukul 02.00" },
        { correct: false, label: "pukul 03.00" },
        { correct: false, label: "pukul 04.30" },
      ],
    },
  },
};

export default item;
