import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Nostalgic" },
        { correct: false, label: "Humorous" },
        { correct: true, label: "Informative" },
        { correct: false, label: "Hostile" },
        { correct: false, label: "Doubtful" },
      ],
    },
  },
};

export default item;
