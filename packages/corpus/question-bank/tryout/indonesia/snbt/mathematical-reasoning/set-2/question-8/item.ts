import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "street-lamp",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "5 detik" },
        { correct: false, label: "10 detik" },
        { correct: false, label: "12 detik" },
        { correct: false, label: "13 detik" },
        { correct: true, label: "15 detik" },
      ],
    },
  },
};

export default item;
