import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tim merubah satu faktor saja, yaitu penambahan kode pengembalian pada setiap gagang.",
        },
        {
          correct: false,
          label:
            "Tim mengrubah satu faktor saja, yaitu penambahan kode pengembalian pada setiap gagang.",
        },
        {
          correct: false,
          label:
            "Tim hanya mengubah satu faktor saja, yaitu penambahan kode pengembalian pada setiap gagang.",
        },
        {
          correct: false,
          label:
            "Tim mengubah terhadap satu faktor saja, yaitu penambahan kode pengembalian pada setiap gagang.",
        },
        {
          correct: true,
          label:
            "Tim mengubah satu faktor saja, yaitu penambahan kode pengembalian pada setiap gagang.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
