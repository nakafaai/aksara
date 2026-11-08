import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "money-changer",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pelanggan yang membeli 100 dolar Singapura lalu langsung menjualnya kembali kehilangan $$\\text{Rp}70{.}000{,}00$$.",
        },
        {
          column: 1,
          label:
            "Selisih kurs jual dan kurs beli ringgit lebih kecil daripada selisih kurs jual dan kurs beli dolar Singapura.",
        },
        {
          column: 2,
          label:
            "Dengan uang $$\\text{Rp}1{.}700{.}000{,}00$$, pelanggan dapat membeli paling banyak 490 ringgit dalam satu transaksi.",
        },
        {
          column: 2,
          label:
            "Menurut kurs jual, harga 1 dolar Singapura lebih mahal daripada harga 3,5 ringgit.",
        },
      ],
    },
  },
};

export default item;
