import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "breakfast-survey",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Lebih dari separuh siswa sarapan 4 atau 5 hari dalam seminggu.",
        },
        {
          column: 2,
          label: "Rata-rata nilai kuis seluruh 400 siswa adalah 69.",
        },
        {
          column: 1,
          label:
            "Dilihat dari persentasenya, kelompok yang paling jarang sarapan paling banyak sulit berkonsentrasi.",
        },
        {
          column: 2,
          label:
            "Jumlah siswa yang sulit berkonsentrasi paling banyak terdapat pada kelompok 0 atau 1 hari.",
        },
      ],
    },
  },
};

export default item;
