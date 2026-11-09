import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Program" },
        { correct: false, label: "Lembaga" },
        { correct: false, label: "Negara" },
        { correct: false, label: "Bangsa" },
        { correct: true, label: "Serikat" },
      ],
    },
  },
};

export default item;
