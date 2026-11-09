import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "bakery-plan",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "60 roti" },
        { correct: false, label: "70 roti" },
        { correct: true, label: "80 roti" },
        { correct: false, label: "90 roti" },
        { correct: false, label: "100 roti" },
      ],
    },
  },
};

export default item;
