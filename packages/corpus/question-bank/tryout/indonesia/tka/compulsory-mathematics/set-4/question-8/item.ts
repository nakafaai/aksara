import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Lift bergerak paling cepat pada $$10$$ detik pertama.",
        },
        {
          column: 1,
          label:
            "Lift berada pada ketinggian $$14\\text{ m}$$ tepat tiga kali.",
        },
        {
          column: 2,
          label:
            "Pada selang $$16\\le t\\le24$$, ketinggian lift bertambah $$1{,}5\\text{ m}$$ setiap detik.",
        },
        {
          column: 2,
          label:
            "Laju rata-rata lift selama $$24$$ detik pertama sama dengan laju rata-rata lift selama $$16$$ detik terakhir.",
        },
      ],
    },
  },
  stimulus: "freight-lift",
};

export default item;
