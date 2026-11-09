import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "bakery-plan",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "40 roti" },
        { correct: true, label: "70 roti" },
        { correct: false, label: "80 roti" },
        { correct: false, label: "110 roti" },
        { correct: false, label: "140 roti" },
      ],
    },
  },
};

export default item;
