import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "coffee-roast",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Jika biji hijau yang dipanggang menjadi kopi dark ditambah $$1\\text{ kg}$$, banyak kantong dark yang terjual selalu bertambah tepat $$3$$.",
        },
        {
          column: 1,
          label:
            "Untuk berat biji hijau yang sama, memanggang semuanya menjadi kopi light selalu menghasilkan pendapatan yang lebih besar daripada memanggang semuanya menjadi kopi dark.",
        },
        {
          column: 1,
          label:
            "Jika semua biji hijau dipanggang menjadi kopi dark dan beratnya paling banyak $$48\\text{ kg}$$, selalu ada kopi sangrai di luar kopi uji rasa yang tidak dijual.",
        },
        {
          column: 2,
          label:
            "Ada berat biji hijau yang paling banyak $$12\\text{ kg}$$ dan menghasilkan tepat $$40$$ kantong kopi light.",
        },
      ],
    },
  },
};

export default item;
