import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Penjualan produk $$A$$ naik $$20\\%$$ dari Februari ke Maret.",
        },
        {
          column: 2,
          label:
            "Total penjualan kedua produk pada Februari lebih tinggi daripada Januari.",
        },
        {
          column: 2,
          label:
            "Penjualan produk $$B$$ turun $$15\\%$$ dari Januari ke Februari.",
        },
        {
          column: 1,
          label:
            "Rata-rata penjualan bulanan produk $$B$$ lebih besar daripada produk $$A$$.",
        },
      ],
    },
  },
};

export default item;
