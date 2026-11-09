import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "monthly-rainfall",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "65 mm" },
        { correct: false, label: "140 mm" },
        { correct: true, label: "165 mm" },
        { correct: false, label: "175 mm" },
        { correct: false, label: "190 mm" },
      ],
    },
  },
};

export default item;
