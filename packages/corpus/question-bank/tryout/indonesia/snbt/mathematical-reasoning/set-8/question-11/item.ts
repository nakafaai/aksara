import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "village-trees",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Banyak bibit yang ditanam naik dengan persentase yang sama setiap tahun.",
        },
        {
          column: 1,
          label: "Banyak pohon yang tumbuh dari bibit tahun kelima adalah 144.",
        },
        {
          column: 1,
          label:
            "Banyak bibit yang mati dari tanaman tiga tahun pertama adalah 81.",
        },
        {
          column: 2,
          label:
            "Banyak bibit yang ditanam pada tahun kesebelas adalah dua kali banyak bibit tahun pertama.",
        },
      ],
    },
  },
};

export default item;
