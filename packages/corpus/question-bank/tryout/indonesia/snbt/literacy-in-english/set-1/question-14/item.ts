import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Prohibition" },
        { correct: false, label: "Possibility" },
        { correct: true, label: "Necessity" },
        { correct: false, label: "Permission" },
        { correct: false, label: "Uncertainty" },
      ],
    },
  },
};

export default item;
