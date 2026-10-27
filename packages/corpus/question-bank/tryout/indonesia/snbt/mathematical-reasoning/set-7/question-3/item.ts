import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Buku tulis" },
        { correct: false, label: "Bolpoin" },
        {
          correct: false,
          label: "Buku tulis dan pensil",
        },
        {
          correct: false,
          label: "Semua memberikan keuntungan sama",
        },
        { correct: true, label: "Pensil" },
      ],
    },
  },
};

export default item;
