import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Senin" },
        { correct: false, label: "Rabu" },
        { correct: false, label: "Kamis" },
        { correct: true, label: "Selasa" },
        { correct: false, label: "Jumat" },
      ],
    },
  },
};

export default item;
