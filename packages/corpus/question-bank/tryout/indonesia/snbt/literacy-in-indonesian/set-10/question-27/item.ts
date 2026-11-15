import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "regression-mean",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Kelompok yang mengikuti kelas tambahan naik lebih banyak daripada kelompok pembanding.",
        },
        {
          column: 2,
          label:
            "Data menunjukkan bahwa kelas tambahan menaikkan nilai sebesar $$10$$ poin.",
        },
        {
          column: 1,
          label:
            "Tanpa perlakuan apa pun, siswa yang bernilai terendah pada tes pertama dapat naik nilainya pada tes kedua.",
        },
        {
          column: 2,
          label:
            "Siswa bernilai tertinggi turun nilainya karena mereka menjadi malas belajar.",
        },
        {
          column: 2,
          label: "Kelompok pembanding juga mengikuti sebagian kelas tambahan.",
        },
      ],
    },
  },
};

export default item;
