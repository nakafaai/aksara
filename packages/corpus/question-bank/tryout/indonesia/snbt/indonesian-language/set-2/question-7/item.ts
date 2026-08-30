import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Semua bacaannya merupakan karya terkenal" },
        {
          isCorrect: false,
          label: "Semua fitur dapat digunakan tanpa berlangganan",
        },
        {
          isCorrect: false,
          label: "Aplikasi dapat digunakan tanpa perangkat digital",
        },
        {
          isCorrect: false,
          label: "Aplikasi tidak memerlukan ruang penyimpanan",
        },
        { isCorrect: true, label: "Bacaan tersedia dalam berbagai bahasa" },
      ],
    },
  },
};

export default item;
