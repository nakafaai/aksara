import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "phone-storage",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "24.300 foto" },
        { correct: true, label: "24.883 foto" },
        { correct: false, label: "25.344 foto" },
        { correct: false, label: "28.160 foto" },
        { correct: false, label: "29.491 foto" },
      ],
    },
  },
};

export default item;
