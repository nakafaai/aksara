import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "daily-relevance",
  },
  stimulus: "food-scraps",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "sebagian besar sampah rumah tangga akan berkurang setelah pemilahan organik diterapkan",
        },
        {
          correct: false,
          label: "sisa hewani dapat dimasukkan tanpa batas",
        },
        {
          correct: false,
          label:
            "pembersihan wadah dapat ditunda selama label bahan tetap terbaca",
        },
        {
          correct: true,
          label:
            "anggota keluarga lebih mudah memisahkan bahan yang dapat diolah",
        },
        {
          correct: false,
          label: "pengolahan tidak memerlukan pemantauan",
        },
      ],
    },
  },
};

export default item;
