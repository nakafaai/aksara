import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "cooking-gas",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Dengan harga sampai $$15$$ Juli, biaya gas per hari dengan tabung $$12\\text{ kg}$$ lebih murah daripada dengan tabung $$5{,}5\\text{ kg}$$, padahal harga per kilogram gas dalam tabung $$12\\text{ kg}$$ lebih mahal.",
        },
        {
          column: 2,
          label:
            "Dengan harga mulai $$16$$ Juli, biaya gas per hari dengan tabung $$12\\text{ kg}$$ tetap lebih murah daripada dengan tabung $$5{,}5\\text{ kg}$$.",
        },
        {
          column: 1,
          label:
            "Jika kompor kecil menyala $$8\\text{ jam}$$ per hari, biaya gas per hari dengan tabung $$12\\text{ kg}$$ pada harga sampai $$15$$ Juli tetap $$\\text{Rp}28{.}000$$.",
        },
        {
          column: 2,
          label:
            "Dengan pemakaian seperti pada tabel, gas yang ikut hilang saat tabung $$12\\text{ kg}$$ ditukar lebih sedikit daripada gas yang ikut hilang saat tabung $$5{,}5\\text{ kg}$$ ditukar.",
        },
      ],
    },
  },
};

export default item;
