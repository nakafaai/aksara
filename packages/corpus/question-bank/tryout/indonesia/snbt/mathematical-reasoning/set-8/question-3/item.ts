import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "garden-fence",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Kebun berbentuk persegi dapat dibuat dengan seluruh kawat itu.",
        },
        {
          column: 1,
          label:
            "Hanya ada satu ukuran kebun yang luasnya tepat $$192\\text{ m}^2$$.",
        },
        {
          column: 2,
          label:
            "Kebun dengan sisi tegak lurus tembok sepanjang 10 m dapat dibuat.",
        },
        {
          column: 2,
          label:
            "Makin panjang sisi yang tegak lurus tembok, makin luas kebun yang dapat dibuat.",
        },
      ],
    },
  },
};

export default item;
