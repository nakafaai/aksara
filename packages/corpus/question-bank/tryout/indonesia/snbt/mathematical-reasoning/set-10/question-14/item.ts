import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "juice-mix",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "300 mL" },
        { correct: false, label: "375 mL" },
        { correct: false, label: "500 mL" },
        { correct: false, label: "600 mL" },
        { correct: true, label: "625 mL" },
      ],
    },
  },
};

export default item;
