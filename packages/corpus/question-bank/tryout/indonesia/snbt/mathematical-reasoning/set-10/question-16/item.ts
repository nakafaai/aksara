import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "juice-mix",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "96 mL" },
        { correct: false, label: "160 mL" },
        { correct: false, label: "256 mL" },
        { correct: true, label: "300 mL" },
        { correct: false, label: "500 mL" },
      ],
    },
  },
};

export default item;
