import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "bayu",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "tetap dan tidak banyak berubah",
        },
        {
          correct: false,
          label: "bertiup sangat kencang sekali",
        },
        {
          correct: false,
          label: "berubah-ubah arah setiap saat sepanjang hari",
        },
        {
          correct: false,
          label: "datang dari arah laut",
        },
        {
          correct: false,
          label: "terasa sejuk dan lembap",
        },
      ],
    },
  },
};

export default item;
