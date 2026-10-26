import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  stimulus: "rain-garden",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "taman dapat dianggap menghilangkan genangan karena dua hujan berikutnya surut lebih cepat",
        },
        {
          correct: true,
          label:
            "dua pengamatan setelah pembangunan mendukung manfaat praktis, tetapi belum membuktikan penyebab tunggal",
        },
        {
          correct: false,
          label: "pembersihan selokan tidak mungkin memengaruhi hasil",
        },
        {
          correct: false,
          label:
            "empat kejadian hujan cukup untuk mewakili pola satu musim di sekolah tersebut",
        },
        {
          correct: false,
          label: "taman harus dibongkar karena datanya terbatas",
        },
      ],
    },
  },
};

export default item;
