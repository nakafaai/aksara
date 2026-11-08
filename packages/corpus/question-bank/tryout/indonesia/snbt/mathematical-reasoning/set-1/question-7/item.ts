import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "rain-tank",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Kapasitas tangki adalah $$3{,}08\\text{ m}^3$$." },
        {
          column: 2,
          label:
            "Hujan dengan curah hujan 40 mm dalam sehari cukup untuk mengisi penuh tangki yang semula kosong.",
        },
        {
          column: 1,
          label:
            "Jika seluruh air hujan dari atap masuk ke tangki, hujan dengan curah hujan 25 mm menghasilkan $$1{,}925\\text{ m}^3$$ air di tangki.",
        },
        {
          column: 2,
          label:
            "Jika keluarga itu memakai $$0{,}14\\text{ m}^3$$ air setiap hari, tangki yang penuh cukup untuk 25 hari tanpa hujan.",
        },
      ],
    },
  },
};

export default item;
