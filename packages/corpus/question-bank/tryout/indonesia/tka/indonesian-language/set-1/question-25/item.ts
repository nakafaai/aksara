import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Memasang contoh nyata pada tutup wadah.",
        },
        {
          correct: true,
          label: "Menjelaskan masalah lapisan perekat atau pelindung.",
        },
        {
          correct: false,
          label:
            "Menggabungkan sisa yang belum teridentifikasi agar petugas dapat memilahnya kemudian.",
        },
        {
          correct: false,
          label: "Menghapus relawan dari meja pengembalian.",
        },
      ],
    },
  },
  stimulus: "food-scraps",
};

export default item;
