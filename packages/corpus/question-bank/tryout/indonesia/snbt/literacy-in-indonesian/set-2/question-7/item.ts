import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Semua bacaannya merupakan karya terkenal",
        },
        {
          correct: true,
          label: "Bacaan tersedia dalam berbagai bahasa",
        },
        {
          correct: false,
          label: "Semua fitur dapat digunakan tanpa berlangganan",
        },
        {
          correct: false,
          label: "Aplikasi dapat digunakan tanpa perangkat digital",
        },
        {
          correct: false,
          label: "Aplikasi tidak memerlukan ruang penyimpanan",
        },
      ],
    },
  },
};

export default item;
