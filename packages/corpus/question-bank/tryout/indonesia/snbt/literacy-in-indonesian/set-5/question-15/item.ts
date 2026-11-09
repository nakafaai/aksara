import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "chili-prices",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Bulan dengan curah hujan tertinggi juga memiliki harga rata-rata tertinggi.",
        },
        {
          column: 1,
          label:
            "Dari Maret ke April, pasokan cabai rawit naik lebih dari 20%.",
        },
        {
          column: 2,
          label:
            "Harga rata-rata pada Juni lebih rendah daripada harga rata-rata pada Mei.",
        },
        {
          column: 2,
          label:
            "Setiap kali curah hujan turun dari bulan sebelumnya, harga rata-rata juga turun.",
        },
      ],
    },
  },
};

export default item;
