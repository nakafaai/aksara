import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "pool-pumps",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "pukul 08.00" },
        { correct: false, label: "pukul 09.00" },
        { correct: false, label: "pukul 09.45" },
        { correct: false, label: "pukul 10.00" },
        { correct: true, label: "pukul 10.15" },
      ],
    },
  },
};

export default item;
