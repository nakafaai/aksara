import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "gerhana",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Gerhana bulan total dapat terjadi pada fase bulan sabit.",
        },
        {
          column: 1,
          label:
            "Atmosfer Bumi lebih banyak menghamburkan cahaya biru daripada cahaya merah.",
        },
        {
          column: 2,
          label:
            "Gerhana bulan total dapat dilihat dari seluruh permukaan Bumi pada saat yang sama.",
        },
        {
          column: 1,
          label:
            "Saat gerhana bulan total, Bumi berada di antara Matahari dan Bulan.",
        },
      ],
    },
  },
};

export default item;
