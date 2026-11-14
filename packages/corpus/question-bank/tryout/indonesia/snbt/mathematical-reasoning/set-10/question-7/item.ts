import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "phone-installment",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Untuk tenor $$3$$ sampai $$12$$ bulan, makin panjang tenor yang dipilih, makin kecil cicilan per bulannya.",
        },
        {
          column: 2,
          label:
            "Cicilan per bulan untuk tenor $$13$$ bulan lebih kecil daripada cicilan per bulan untuk tenor $$12$$ bulan.",
        },
        {
          column: 2,
          label:
            "Untuk tenor $$9$$ bulan, jumlah semua cicilan tepat sama dengan pokok kredit ditambah total bunganya.",
        },
        {
          column: 1,
          label:
            "Untuk tenor berapa pun, pelunasan dipercepat tepat setelah cicilan mana pun sebelum cicilan terakhir selalu membuat seluruh pembayaran lebih kecil daripada membayar semua cicilan sampai tenor selesai.",
        },
      ],
    },
  },
};

export default item;
