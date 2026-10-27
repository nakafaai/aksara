import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Oktober" },
        { correct: false, label: "November" },
        { correct: true, label: "Desember" },
        { correct: false, label: "Januari" },
        { correct: false, label: "Februari" },
      ],
    },
  },
};

export default item;
