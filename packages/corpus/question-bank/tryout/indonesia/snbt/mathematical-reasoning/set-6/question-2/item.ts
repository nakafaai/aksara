import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "water-tower",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Selama pompa Q menyala, isi tandon terus bertambah.",
        },
        {
          column: 1,
          label:
            "Air yang terbuang melalui pipa luapan pada hari itu sebanyak $$2{.}000\\text{ liter}$$.",
        },
        {
          column: 2,
          label:
            "Jika keran K dibuka sejak pukul 05.00 dan jadwal lainnya tetap, tidak ada air yang terbuang melalui pipa luapan.",
        },
        {
          column: 1,
          label:
            "Pada pukul 08.00, isi tandon tidak lebih dari setengah kapasitasnya.",
        },
      ],
    },
  },
};

export default item;
