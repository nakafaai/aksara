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
          isCorrect: true,
          label:
            "kesalahan menurun setelah contoh nyata dan penjelasan ditambahkan",
        },
        {
          isCorrect: false,
          label: "kantin menghasilkan sisa makanan setiap hari",
        },
        {
          isCorrect: false,
          label: "lubang biopori diperiksa secara berkala",
        },
        {
          isCorrect: false,
          label: "relawan berdiri di dekat wadah",
        },
        {
          isCorrect: false,
          label: "uji coba berlangsung empat minggu",
        },
      ],
    },
  },
  stimulusKey: "food-scraps",
};

export default item;
