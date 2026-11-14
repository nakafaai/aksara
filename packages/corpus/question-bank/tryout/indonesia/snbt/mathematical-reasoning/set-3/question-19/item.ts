import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "warehouse-stock",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pesanan kedua dibuat pada akhir hari ke-$$8$$ dan tiba pada pagi hari ke-$$11$$.",
        },
        {
          column: 2,
          label:
            "Jika ukuran pesanan diubah menjadi $$100$$ karung, total penjualan hilang selama $$12$$ hari menjadi lebih besar.",
        },
        {
          column: 2,
          label:
            "Jika pesanan yang dibuat pada akhir hari ke-$$d$$ tiba pada pagi hari ke-$$(d+2)$$, masih ada penjualan hilang selama $$12$$ hari itu.",
        },
        {
          column: 2,
          label:
            "Jika permintaan hari ke-$$9$$ hanya $$35$$ karung, tidak ada penjualan hilang pada hari ke-$$10$$.",
        },
      ],
    },
  },
};

export default item;
