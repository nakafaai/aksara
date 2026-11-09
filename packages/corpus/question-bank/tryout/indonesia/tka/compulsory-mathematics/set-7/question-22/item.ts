import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "library-visits",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Banyak seluruh pengunjung pada minggu kedua $$15$$ orang lebih banyak daripada minggu pertama.",
        },
        {
          column: 1,
          label:
            "Banyak pengunjung hari Kamis naik lebih dari $$35\\,\\%$$ dari minggu pertama ke minggu kedua.",
        },
        {
          column: 2,
          label:
            "Median banyak pengunjung minggu kedua lebih kecil daripada median minggu pertama.",
        },
        {
          column: 2,
          label:
            "Selama dua minggu itu, pengunjung paling sedikit tercatat pada hari Jumat minggu pertama.",
        },
      ],
    },
  },
};

export default item;
