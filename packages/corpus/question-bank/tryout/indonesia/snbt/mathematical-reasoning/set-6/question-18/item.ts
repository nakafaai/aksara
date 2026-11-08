import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "speed-cameras",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "mobil Q dan S" },
        { correct: false, label: "mobil Q saja" },
        { correct: false, label: "mobil P, Q, dan S" },
        { correct: false, label: "mobil S saja" },
        { correct: false, label: "mobil P dan Q" },
      ],
    },
  },
};

export default item;
