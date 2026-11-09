import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "delivery-drone",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Lama terbang dengan baterai penuh berbanding terbalik dengan beban yang dibawa.",
        },
        {
          column: 1,
          label:
            "Setiap tambahan beban 1 kg mengurangi lama terbang dengan baterai penuh sebanyak 4 menit.",
        },
        {
          column: 2,
          label:
            "Jika beban dijadikan dua kali semula, lama terbang dengan baterai penuh menjadi setengah lama terbang semula.",
        },
        {
          column: 1,
          label:
            "Dengan beban 3,75 kg, lama terbang dengan baterai penuh tepat setengah lama terbang tanpa beban.",
        },
      ],
    },
  },
};

export default item;
