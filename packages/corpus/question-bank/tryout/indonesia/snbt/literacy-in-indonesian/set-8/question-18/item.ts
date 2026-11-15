import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "household-spending",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Kelompok $$20\\%$$ tengah membelanjakan lebih dari separuh pengeluarannya untuk makanan.",
        },
        {
          column: 2,
          label:
            "Pengeluaran bukan makanan kelompok $$20\\%$$ terbawah lebih besar daripada pengeluaran makanannya.",
        },
        {
          column: 1,
          label:
            "Pengeluaran bukan makanan per kapita kelompok $$20\\%$$ teratas lebih dari sepuluh kali pengeluaran bukan makanan kelompok $$20\\%$$ terbawah.",
        },
        {
          column: 2,
          label:
            "Porsi makanan turun dengan besar yang sama di antara setiap dua kelompok yang berurutan.",
        },
      ],
    },
  },
};

export default item;
