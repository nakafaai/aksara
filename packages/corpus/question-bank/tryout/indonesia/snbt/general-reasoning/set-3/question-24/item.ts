import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "dermaga",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Pada hari Senin, ada keberangkatan dari Karang Mas yang membawa kurang dari $$160$$ penumpang.",
        },
        {
          column: 1,
          label:
            "Dari Jumat ke Sabtu, banyak penumpang yang berangkat dari Batu Lintang naik lebih dari $$20\\%$$.",
        },
        {
          column: 1,
          label:
            "Selama minggu itu, penumpang yang berangkat dari Karang Mas lebih banyak daripada penumpang yang berangkat dari Batu Lintang.",
        },
        {
          column: 2,
          label:
            "Penumpang pada hari Sabtu dan Minggu lebih dari $$40\\%$$ dari seluruh penumpang minggu itu.",
        },
      ],
    },
  },
};

export default item;
