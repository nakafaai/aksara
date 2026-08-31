import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "daily-relevance",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "sebagian besar sampah rumah tangga akan berkurang setelah pemilahan organik diterapkan",
        },
        {
          isCorrect: false,
          label: "sisa hewani dapat dimasukkan tanpa batas",
        },
        {
          isCorrect: false,
          label:
            "pembersihan wadah dapat ditunda selama label bahan tetap terbaca",
        },
        {
          isCorrect: true,
          label:
            "anggota keluarga lebih mudah memisahkan bahan yang dapat diolah",
        },
        {
          isCorrect: false,
          label: "pengolahan tidak memerlukan pemantauan",
        },
      ],
    },
  },
  stimulusKey: "food-scraps",
};

export default item;
