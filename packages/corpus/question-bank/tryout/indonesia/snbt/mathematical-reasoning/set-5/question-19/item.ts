import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "menu-nutrition",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Setiap paket sehat memuat paling sedikit satu porsi ayam panggang.",
        },
        {
          column: 2,
          label:
            "Paket sehat yang paling mahal pasti merupakan paket sehat dengan protein terbanyak.",
        },
        {
          column: 1,
          label:
            "Jika batas kalori dinaikkan menjadi $$650\\text{ kkal}$$ dan ketentuan lain tetap, ada paket tanpa ayam panggang yang memenuhi semua ketentuan.",
        },
        {
          column: 1,
          label:
            "Ada paket sehat yang tidak lagi menjadi paket sehat setelah ditambah satu porsi tumis sayur.",
        },
      ],
    },
  },
};

export default item;
