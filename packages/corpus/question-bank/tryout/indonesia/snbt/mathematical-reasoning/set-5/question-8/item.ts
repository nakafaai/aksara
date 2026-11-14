import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "track-laps",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$61$$ detik" },
        { correct: false, label: "$$71$$ detik" },
        { correct: true, label: "$$74$$ detik" },
        { correct: false, label: "$$76$$ detik" },
        { correct: false, label: "$$80$$ detik" },
      ],
    },
  },
};

export default item;
