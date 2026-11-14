import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "orchard-yield",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Hasil panen total dengan $$60$$ pohon sama dengan hasil panen total dengan $$40$$ pohon.",
        },
        {
          column: 2,
          label:
            "Jika harga jeruk naik menjadi $$\\text{Rp}12{.}000$$ per kilogram dan aturan lain tetap, banyak pohon yang memberi keuntungan terbesar tetap $$47$$ pohon.",
        },
        {
          column: 2,
          label:
            "Keuntungan dengan $$70$$ pohon lebih kecil daripada keuntungan dengan $$30$$ pohon.",
        },
        {
          column: 2,
          label:
            "Jika banyak pohon paling sedikit $$65$$, hasil setiap pohon kurang dari $$70\\text{ kg}$$.",
        },
      ],
    },
  },
};

export default item;
