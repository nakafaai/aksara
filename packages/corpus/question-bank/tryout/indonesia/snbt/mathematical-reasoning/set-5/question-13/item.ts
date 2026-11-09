import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "solar-panels",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "5 panel" },
        { correct: false, label: "8 panel" },
        { correct: false, label: "9 panel" },
        { correct: true, label: "10 panel" },
        { correct: false, label: "45 panel" },
      ],
    },
  },
};

export default item;
