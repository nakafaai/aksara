import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "Yogyakarta" },
        { correct: false, label: "Lombok" },
        { correct: false, label: "Manado" },
        { correct: false, label: "Padang" },
        { correct: false, label: "Bali" },
      ],
    },
  },
};

export default item;
