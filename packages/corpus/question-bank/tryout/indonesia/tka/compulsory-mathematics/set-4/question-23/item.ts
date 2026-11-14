import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "harian",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Berapa pun nilai $$v$$, median kesebelas data pasti paling sedikit $$40$$ dan paling banyak $$41$$.",
        },
        {
          column: 2,
          label:
            "Jika $$v=46$$, simpangan baku kesebelas data tetap $$6$$ gelas.",
        },
        {
          column: 1,
          label:
            "Jika rata-rata kesebelas data adalah $$41$$ gelas, simpangan baku kesebelas data lebih dari $$6$$ gelas.",
        },
      ],
    },
  },
};

export default item;
