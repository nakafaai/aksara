import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "wheelchair-ramp",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "7,2 m" },
        { correct: true, label: "8,7 m" },
        { correct: false, label: "10,2 m" },
        { correct: false, label: "12 m" },
        { correct: false, label: "13,5 m" },
      ],
    },
  },
};

export default item;
