import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "reading-books",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Median banyak buku yang dibaca menjadi $$2{,}5$$.",
        },
        {
          column: 1,
          label:
            "Rata-rata banyak buku yang dibaca menjadi lebih dari $$2{,}5$$.",
        },
        {
          column: 2,
          label: "Data $$30$$ siswa itu mempunyai tepat satu modus.",
        },
        {
          column: 2,
          label: "Jangkauan data bertambah.",
        },
      ],
    },
  },
};

export default item;
