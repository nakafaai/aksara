import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "sleep-tracker",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Pukul 20.35" },
        { correct: false, label: "Pukul 20.45" },
        { correct: false, label: "Pukul 20.55" },
        { correct: true, label: "Pukul 21.05" },
        { correct: false, label: "Pukul 21.25" },
      ],
    },
  },
};

export default item;
