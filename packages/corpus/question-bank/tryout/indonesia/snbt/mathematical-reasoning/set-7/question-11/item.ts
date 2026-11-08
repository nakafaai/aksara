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
          label:
            "Jarak garis lurus dari G ke A adalah 500 m, tetapi jarak tempuh terpendek robot dari G ke A adalah 700 m.",
        },
        {
          column: 1,
          label:
            "Perjalanan pulang pergi dari G ke B melalui jalur terpendek menghabiskan $$24\\%$$ baterai.",
        },
        {
          column: 2,
          label:
            "Robot dengan sisa baterai $$40\\%$$ dapat mengunjungi ketiga pelanggan lalu kembali ke G.",
        },
      ],
    },
  },
};

export default item;
