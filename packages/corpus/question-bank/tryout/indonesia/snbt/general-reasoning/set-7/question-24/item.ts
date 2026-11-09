import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "minuman",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pendapatan pada hari Rabu lebih besar daripada pendapatan pada hari Kamis.",
        },
        {
          column: 2,
          label:
            "Selama seminggu, pendapatan dari kopi susu lebih dari separuh seluruh pendapatan kantin dari ketiga minuman.",
        },
        {
          column: 1,
          label:
            "Rata-rata gelas cokelat yang terjual per hari adalah $$30$$ gelas.",
        },
        {
          column: 2,
          label:
            "Banyak gelas yang terjual sama pada setiap hari dalam minggu itu.",
        },
      ],
    },
  },
};

export default item;
