import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "main-supporting-ideas",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Laras membeli tinta merah agar peta lebih jelas tanpa memeriksa hambatan pada jalur",
        },
        {
          correct: false,
          label:
            "ibu Laras mencetak lebih banyak peta dan menganggap jumlah salinan cukup menyelesaikan masalah akses",
        },
        {
          correct: false,
          label:
            "Laras menerima jawaban umum warga dan mencatat jalur lama tanpa mengujinya bersama pengguna",
        },
        {
          correct: true,
          label:
            "Laras memeriksa hambatan dan menemukan jalur alternatif yang lebih dapat diakses",
        },
        {
          correct: false,
          label:
            "Laras memindahkan letak lapangan pada peta tanpa menelusuri jalur alternatif menuju tempat itu",
        },
      ],
    },
  },
  stimulus: "mapmakers-ink",
};

export default item;
