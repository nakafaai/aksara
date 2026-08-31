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
          label:
            "taman dapat dianggap menghilangkan genangan karena dua hujan berikutnya surut lebih cepat",
        },
        {
          isCorrect: true,
          label:
            "dua pengamatan awal mendukung manfaat praktis, tetapi belum membuktikan penyebab tunggal",
        },
        {
          isCorrect: false,
          label: "pembersihan selokan tidak mungkin memengaruhi hasil",
        },
        {
          isCorrect: false,
          label:
            "empat kejadian hujan cukup untuk mewakili pola satu musim di sekolah tersebut",
        },
        {
          isCorrect: false,
          label: "taman harus dibongkar karena datanya terbatas",
        },
      ],
    },
  },
  stimulusKey: "rain-garden",
};

export default item;
