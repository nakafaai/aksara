import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "3 jam" },
        { correct: false, label: "4 jam" },
        { correct: false, label: "5 jam" },
        { correct: false, label: "6 jam" },
        { correct: true, label: "7 jam" },
      ],
    },
  },
};

export default item;
