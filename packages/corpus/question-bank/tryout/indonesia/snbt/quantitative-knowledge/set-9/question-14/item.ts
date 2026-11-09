import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Jika nilai 90 diganti menjadi 100, median data berubah.",
        },
        { column: 1, label: "Rata-rata data adalah 80." },
        { column: 2, label: "Jangkauan data adalah 25." },
        {
          column: 1,
          label: "Jika setiap nilai ditambah 5, median data menjadi 85.",
        },
      ],
    },
  },
};

export default item;
