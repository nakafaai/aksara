import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Setiap banjir musiman selalu memperbaiki setiap tanah",
        },
        {
          correct: false,
          label:
            "Pengendapan bersih dapat menahan sedimen dan unsur hara di dataran banjir",
        },
        {
          correct: false,
          label:
            "Erosi dapat membawa sedimen dan unsur hara keluar dari dataran banjir",
        },
        {
          correct: false,
          label:
            "Dampak genangan antara lain bergantung pada keseimbangan pengendapan dan erosi",
        },
        {
          correct: false,
          label:
            "Unsur hara yang tertahan dapat mendukung pertumbuhan tanaman jika pengendapan melebihi erosi",
        },
      ],
    },
  },
};

export default item;
