import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "beber",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Meskipun tugas menghidupkan cerita jatuh ke suara dalang, gambar yang dipandangi tanpa tuturan tetap memperlihatkan peristiwa-peristiwa cerita.",
        },
        {
          column: 2,
          label:
            "Dari dua gulungan, gulungan yang memuat lebih banyak adegan pasti menghasilkan pertunjukan yang lebih lama.",
        },
        {
          column: 2,
          label:
            "Semua gulungan wayang beber yang dipentaskan saat ini terbuat dari daluang.",
        },
        {
          column: 1,
          label:
            "Cara bertutur wayang beber kini dapat disaksikan tanpa membentangkan satu pun gulungan pusaka.",
        },
      ],
    },
  },
};

export default item;
