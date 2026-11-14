import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "scholarship-score",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Bayu, Dimas, dan Eka" },
        { correct: false, label: "Ayu, Citra, dan Fajar" },
        { correct: true, label: "Ayu, Bayu, dan Eka" },
        { correct: false, label: "Bayu, Citra, dan Eka" },
        { correct: false, label: "Ayu, Citra, dan Eka" },
      ],
    },
  },
};

export default item;
