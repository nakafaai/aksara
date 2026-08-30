import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "taman pasti menghilangkan semua genangan pada setiap musim",
        },
        {
          isCorrect: false,
          label: "pembersihan selokan tidak mungkin memengaruhi hasil",
        },
        {
          isCorrect: false,
          label: "empat kejadian hujan sudah mewakili semua cuaca",
        },
        {
          isCorrect: false,
          label: "taman harus dibongkar karena datanya terbatas",
        },
        {
          isCorrect: true,
          label:
            "dua pengamatan awal mendukung manfaat praktis, tetapi belum membuktikan penyebab tunggal",
        },
      ],
    },
  },
  stimulusKey: "rain-garden",
};

export default item;
