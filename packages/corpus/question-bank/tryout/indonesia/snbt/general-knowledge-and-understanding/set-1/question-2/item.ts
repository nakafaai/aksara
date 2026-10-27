import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "terawat." },
        { correct: false, label: "terbangun." },
        { correct: false, label: "terpelihara." },
        { correct: false, label: "terlindungi." },
        { correct: true, label: "terlelap." },
      ],
    },
  },
};

export default item;
