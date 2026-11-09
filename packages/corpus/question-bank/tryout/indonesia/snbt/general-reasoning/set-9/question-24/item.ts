import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "konser",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Tiket yang terjual pada hari ke-2 lebih banyak daripada tiket yang terjual pada hari ke-1.",
        },
        {
          column: 1,
          label:
            "Pendapatan dari tiket VIP pada hari ke-2 naik $$25\\%$$ dibandingkan hari ke-1.",
        },
        {
          column: 2,
          label:
            "Pendapatan seluruhnya pada hari ke-1 lebih dari $$\\text{Rp}260$$ juta.",
        },
        {
          column: 2,
          label:
            "Tiket Tribun menyumbang lebih dari $$40\\%$$ pendapatan seluruhnya selama dua hari.",
        },
      ],
    },
  },
};

export default item;
