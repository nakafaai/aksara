import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Rata-rata nilai kelas A lebih besar daripada rata-rata nilai kelas B.",
        },
        {
          column: 2,
          label:
            "Median nilai kelas A lebih besar daripada median nilai kelas B.",
        },
        {
          column: 1,
          label:
            "Jangkauan nilai kelas A lebih besar daripada jangkauan nilai kelas B.",
        },
        {
          column: 1,
          label:
            "Jika nilai 95 di kelas A diganti 85, rata-rata nilai kelas A menjadi lebih kecil daripada rata-rata nilai kelas B.",
        },
      ],
    },
  },
};

export default item;
