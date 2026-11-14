import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 2, label: "Banyak kata sandi aman adalah $$6{.}480$$." },
        {
          column: 1,
          label:
            "Banyak kata sandi aman yang memuat tepat dua angka berbeda adalah $$90$$.",
        },
        {
          column: 1,
          label:
            "Banyak kata sandi aman yang keempat angkanya berbeda adalah $$5{.}040$$.",
        },
        {
          column: 1,
          label:
            "Banyak kata sandi aman yang memuat tepat tiga angka berbeda adalah $$1{.}440$$.",
        },
      ],
    },
  },
};

export default item;
