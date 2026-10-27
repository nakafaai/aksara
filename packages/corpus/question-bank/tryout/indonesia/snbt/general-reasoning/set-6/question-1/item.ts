import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Ayam" },
        { correct: false, label: "Sapi" },
        { correct: false, label: "Kelinci" },
        { correct: true, label: "Domba" },
        { correct: false, label: "Bebek" },
      ],
    },
  },
};

export default item;
