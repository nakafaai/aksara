import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "wheelchair-ramp",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "10 cm" },
        { correct: false, label: "20 cm" },
        { correct: false, label: "30 cm" },
        { correct: false, label: "50 cm" },
        { correct: false, label: "60 cm" },
      ],
    },
  },
};

export default item;
