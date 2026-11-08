import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "street-lamp",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "6 detik" },
        { correct: false, label: "9 detik" },
        { correct: false, label: "12 detik" },
        { correct: false, label: "$$13{,}5$$ detik" },
        { correct: true, label: "15 detik" },
      ],
    },
  },
};

export default item;
