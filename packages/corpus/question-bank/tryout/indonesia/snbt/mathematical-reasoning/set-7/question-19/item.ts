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
            "Dengan beban 5 kg, drone dapat terbang selama 15 menit dengan baterai penuh.",
        },
        {
          column: 1,
          label:
            "Setiap tambahan beban 1 kg mengurangi lama terbang dengan baterai penuh sebanyak 4 menit.",
        },
        {
          column: 2,
          label:
            "Dengan beban 4 kg dan baterai penuh, drone dapat menempuh jarak 10 km.",
        },
        {
          column: 1,
          label:
            "Tanpa beban dan dengan baterai penuh, drone dapat menempuh jarak paling jauh 18 km.",
        },
      ],
    },
  },
};

export default item;
