import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Sains" },
        { correct: false, label: "Agama" },
        { correct: false, label: "Sastra" },
        { correct: true, label: "Kamus" },
        { correct: false, label: "Sejarah" },
      ],
    },
  },
};

export default item;
