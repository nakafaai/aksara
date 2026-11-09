import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "speed-cameras",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "40 km/jam" },
        { correct: false, label: "50 km/jam" },
        { correct: false, label: "60 km/jam" },
        { correct: false, label: "72 km/jam" },
        { correct: true, label: "75 km/jam" },
      ],
    },
  },
};

export default item;
