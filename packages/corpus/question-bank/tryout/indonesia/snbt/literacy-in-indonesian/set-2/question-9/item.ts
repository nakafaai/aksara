import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Malin Kundang" },
        { correct: false, label: "Sangkuriang" },
        { correct: true, label: "Laba-Laba Sakti" },
        { correct: false, label: "Timun Mas" },
        { correct: false, label: "Roro Jonggrang" },
      ],
    },
  },
};

export default item;
