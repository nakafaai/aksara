import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "solar-panels",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "4 tahun" },
        { correct: true, label: "5 tahun" },
        { correct: false, label: "6 tahun" },
        { correct: false, label: "8 tahun" },
        { correct: false, label: "10 tahun" },
      ],
    },
  },
};

export default item;
