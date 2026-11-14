import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "river-gauge",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Pukul 08.40" },
        { correct: false, label: "Pukul 09.10" },
        { correct: false, label: "Pukul 09.20" },
        { correct: false, label: "Pukul 09.30" },
        { correct: true, label: "Pukul 09.40" },
      ],
    },
  },
};

export default item;
