import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "fuel-trip",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "90 km" },
        { correct: false, label: "100 km" },
        { correct: false, label: "125 km" },
        { correct: true, label: "150 km" },
        { correct: false, label: "225 km" },
      ],
    },
  },
};

export default item;
