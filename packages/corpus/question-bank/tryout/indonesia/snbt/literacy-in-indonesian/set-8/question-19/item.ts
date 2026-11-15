import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
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
            "Kenaikan harga beras $$20\\%$$ menambah pengeluaran kelompok $$20\\%$$ terbawah sekitar $$3{,}6\\%$$ dari seluruh pengeluarannya, jika banyak beras yang dibeli tetap.",
        },
        {
          column: 1,
          label:
            "Dalam rupiah, tambahan biaya beras kelompok $$20\\%$$ teratas lebih besar daripada tambahan biaya beras kelompok $$20\\%$$ terbawah.",
        },
        {
          column: 2,
          label:
            "Subsidi harga beras di semua toko memberi rupiah paling banyak kepada kelompok $$20\\%$$ terbawah.",
        },
        {
          column: 1,
          label:
            "Sebagai bagian dari seluruh pengeluaran, kenaikan harga beras paling berat bagi kelompok $$20\\%$$ terbawah.",
        },
        {
          column: 2,
          label:
            "Porsi beras dalam pengeluaran kelompok $$20\\%$$ teratas lebih besar daripada porsi beras kelompok $$20\\%$$ terbawah.",
        },
      ],
    },
  },
};

export default item;
