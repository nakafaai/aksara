import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "outline",
  },
  responses: {
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "Memasang contoh nyata pada tutup wadah.",
        },
        {
          isCorrect: true,
          label: "Menjelaskan masalah lapisan perekat atau pelindung.",
        },
        {
          isCorrect: false,
          label: "Menggabungkan kembali semua jenis sisa.",
        },
        {
          isCorrect: false,
          label: "Menghapus relawan dari meja pengembalian.",
        },
      ],
    },
  },
  stimulusKey: "food-scraps",
};

export default item;
