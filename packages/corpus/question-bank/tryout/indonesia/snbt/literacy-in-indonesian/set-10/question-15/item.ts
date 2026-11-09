import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "bike-share",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Jumlah perjalanan turun setiap bulan selama puncak musim hujan.",
        },
        {
          column: 1,
          label:
            "Jumlah perjalanan pada Juni lebih dari dua kali jumlah perjalanan pada Januari.",
        },
        {
          column: 2,
          label:
            "Rata-rata perjalanan per sepeda pada Juni dua kali rata-rata pada April.",
        },
        {
          column: 1,
          label:
            "Rata-rata perjalanan per sepeda pada Maret lebih tinggi daripada pada Mei.",
        },
      ],
    },
  },
};

export default item;
