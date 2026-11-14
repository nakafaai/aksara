import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Volume balok baru sama dengan volume balok semula.",
        },
        {
          column: 1,
          label:
            "Jika balok semula berbentuk kubus, luas permukaan balok baru lebih besar daripada luas permukaan balok semula.",
        },
        {
          column: 2,
          label:
            "Untuk setiap ukuran awal, luas permukaan balok baru lebih besar daripada luas permukaan balok semula.",
        },
        {
          column: 1,
          label:
            "Ada ukuran awal tabung yang membuat luas permukaan tabung baru tepat $$2$$ kali luas permukaan tabung semula.",
        },
      ],
    },
  },
};

export default item;
