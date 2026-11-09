import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "appropriate" },
        { correct: false, label: "sustainable" },
        { correct: false, label: "digital" },
        { correct: false, label: "limited" },
        { correct: true, label: "equitable" },
      ],
    },
  },
};

export default item;
