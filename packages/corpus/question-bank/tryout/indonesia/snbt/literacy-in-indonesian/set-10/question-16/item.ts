import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "bike-share",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Jumlah perjalanan pada April ternyata lebih sedikit daripada pada Maret.",
        },
        {
          correct: true,
          label:
            "Perjalanan per sepeda turun pada April, jadi kenaikannya karena sepeda bertambah.",
        },
        {
          correct: false,
          label:
            "Kenaikan jumlah perjalanan dari Maret ke April lebih dari dua kali lipat.",
        },
        {
          correct: false,
          label:
            "Tabel tidak mencatat jumlah sepeda yang tersedia pada setiap bulan.",
        },
        {
          correct: false,
          label:
            "Musim hujan justru baru dimulai pada April, sehingga perjalanan seharusnya turun.",
        },
      ],
    },
  },
};

export default item;
