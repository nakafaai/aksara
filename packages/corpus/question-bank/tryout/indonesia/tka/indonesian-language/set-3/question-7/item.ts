import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "main-supporting-ideas",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Laras membeli tinta merah agar peta lebih jelas tanpa memeriksa hambatan pada jalur",
        },
        {
          isCorrect: false,
          label:
            "ibu Laras mencetak lebih banyak peta dan menganggap jumlah salinan cukup menyelesaikan masalah akses",
        },
        {
          isCorrect: false,
          label:
            "Laras menerima jawaban umum warga dan mencatat jalur lama tanpa mengujinya bersama pengguna",
        },
        {
          isCorrect: true,
          label:
            "Laras memeriksa hambatan dan menemukan jalur alternatif yang lebih dapat diakses",
        },
        {
          isCorrect: false,
          label:
            "Laras memindahkan letak lapangan pada peta tanpa menelusuri jalur alternatif menuju tempat itu",
        },
      ],
    },
  },
  stimulusKey: "mapmakers-ink",
};

export default item;
