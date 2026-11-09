import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "unduhan",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Selisih unduhan Y dan X pada bulan Januari adalah $$20$$ ribu.",
        },
        {
          column: 1,
          label: "Selisih unduhan Y dan X mengecil setiap bulan.",
        },
        {
          column: 2,
          label: "Rata-rata unduhan X per bulan lebih dari $$32$$ ribu.",
        },
        {
          column: 2,
          label:
            "Unduhan Y pada bulan Mei lebih dari $$1{,}25$$ kali unduhan Y pada bulan Januari.",
        },
      ],
    },
  },
};

export default item;
