import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "medicine-level",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "4 jam" },
        { correct: false, label: "8 jam" },
        { correct: false, label: "12 jam" },
        { correct: true, label: "16 jam" },
        { correct: false, label: "24 jam" },
      ],
    },
  },
};

export default item;
