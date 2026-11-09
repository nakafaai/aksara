import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "village-trees",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "tahun ke-6" },
        { correct: false, label: "tahun ke-8" },
        { correct: false, label: "tahun ke-10" },
        { correct: true, label: "tahun ke-11" },
        { correct: false, label: "tahun ke-12" },
      ],
    },
  },
};

export default item;
