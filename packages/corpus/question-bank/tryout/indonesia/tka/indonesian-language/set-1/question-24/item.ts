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
          label: "semua sampah rumah tangga pasti hilang",
        },
        {
          isCorrect: true,
          label:
            "anggota keluarga lebih mudah memisahkan bahan yang dapat diolah",
        },
        {
          isCorrect: false,
          label: "sisa hewani dapat dimasukkan tanpa batas",
        },
        {
          isCorrect: false,
          label: "wadah tidak perlu pernah dibersihkan",
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
