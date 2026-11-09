import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "tourist-map",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "1 : 62.500" },
        { correct: false, label: "1 : 125.000" },
        { correct: false, label: "1 : 250.000" },
        { correct: true, label: "1 : 500.000" },
        { correct: false, label: "1 : 1.000.000" },
      ],
    },
  },
};

export default item;
