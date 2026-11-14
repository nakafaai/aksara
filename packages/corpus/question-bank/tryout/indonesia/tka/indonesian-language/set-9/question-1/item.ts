import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "information-quality",
  },
  stimulus: "oil-soap",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "pernyataan itu belum didukung data karena jelantah baru dikumpulkan dari sebagian warga dan kualitas air sungai belum diukur",
        },
        {
          correct: false,
          label:
            "pernyataan itu terbukti karena 240 liter jelantah berhasil dikumpulkan",
        },
        {
          correct: false,
          label:
            "pernyataan itu salah karena sabun dari jelantah tidak laku dijual",
        },
        {
          correct: false,
          label: "pernyataan itu tepat karena sabun dijual dengan harga murah",
        },
        {
          correct: false,
          label:
            "pernyataan itu tidak relevan karena sabun dibuat dengan soda api",
        },
      ],
    },
  },
};

export default item;
