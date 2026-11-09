import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "shoe-sizes",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Median ukuran sepatu tetap $$39$$.",
        },
        {
          column: 2,
          label: "Jangkauan ukuran sepatu bertambah.",
        },
        {
          column: 1,
          label: "Rata-rata ukuran sepatu menjadi lebih dari $$39{,}5$$.",
        },
        {
          column: 2,
          label: "Ukuran $$42$$ menjadi modus data.",
        },
      ],
    },
  },
};

export default item;
