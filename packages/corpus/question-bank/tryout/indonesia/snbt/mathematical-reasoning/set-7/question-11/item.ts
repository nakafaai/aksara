import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "delivery-robot",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Jarak tempuh terpendek antara pelanggan A dan pelanggan C adalah 500 m.",
        },
        {
          column: 1,
          label: "Banyak rute terpendek yang berbeda dari G ke B adalah 6.",
        },
        {
          column: 1,
          label:
            "Perjalanan pulang pergi dari G ke B melalui jalur terpendek menghabiskan $$24\\%$$ baterai.",
        },
        {
          column: 2,
          label:
            "Dengan baterai penuh, robot dapat menempuh jarak lebih dari 5 km.",
        },
      ],
    },
  },
};

export default item;
