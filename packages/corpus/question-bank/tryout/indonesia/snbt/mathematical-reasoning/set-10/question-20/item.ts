import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "photo-frame",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "1 cm" },
        { correct: false, label: "2 cm" },
        { correct: false, label: "3 cm" },
        { correct: true, label: "4 cm" },
        { correct: false, label: "5 cm" },
      ],
    },
  },
};

export default item;
