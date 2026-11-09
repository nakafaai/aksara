import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "food-waste",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Sayur menghasilkan jumlah sisa makanan terbesar per rumah tangga per minggu.",
        },
        {
          column: 1,
          label:
            "Lebih dari dua pertiga sisa makanan dalam survei tergolong dapat dihindari.",
        },
        {
          column: 2,
          label:
            "Sisa buah yang dapat dihindari lebih banyak daripada sisa lauk hewani yang dapat dihindari.",
        },
        {
          column: 2,
          label: "Survei mencatat sisa makanan yang diberikan kepada ternak.",
        },
      ],
    },
  },
};

export default item;
