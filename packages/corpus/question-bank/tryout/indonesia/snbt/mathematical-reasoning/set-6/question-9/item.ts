import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "night-bus",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Pukul 21.18" },
        { correct: true, label: "Pukul 21.36" },
        { correct: false, label: "Pukul 21.54" },
        { correct: false, label: "Pukul 22.12" },
        { correct: false, label: "Pukul 22.30" },
      ],
    },
  },
};

export default item;
