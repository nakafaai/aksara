import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "bacteria-harvest",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Jika populasi awal $$40$$ juta sel, banyak bakteri tepat setelah setiap panen mulai $$t=6$$ selalu $$760$$ juta sel.",
        },
        {
          column: 2,
          label:
            "Total panen selama $$0\\le t\\le12$$ dengan populasi awal $$52$$ juta sel tepat $$2$$ kali total panen selama $$0\\le t\\le12$$ dengan populasi awal $$26$$ juta sel.",
        },
        {
          column: 1,
          label: "Jika populasi awal $$25$$ juta sel, kultur habis pada panen pertama.",
        },
        {
          column: 2,
          label:
            "Dari dua populasi awal yang berbeda, populasi awal yang lebih besar selalu menghasilkan lebih banyak bakteri tepat setelah panen pada $$t=9$$.",
        },
      ],
    },
  },
};

export default item;
