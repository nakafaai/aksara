import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "rooftop-solar",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Rumah Q dan Rumah R memiliki kapasitas panel yang sama dan menghasilkan listrik yang sama.",
        },
        {
          column: 2,
          label:
            "Rumah S tidak perlu membeli listrik dari jaringan sama sekali.",
        },
        {
          column: 1,
          label:
            "Rumah dengan kapasitas panel terbesar juga menghasilkan listrik paling banyak.",
        },
        {
          column: 1,
          label:
            "Selama bulan itu, panel Rumah S menghasilkan listrik lebih banyak daripada yang dipakai rumahnya.",
        },
      ],
    },
  },
};

export default item;
