import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "sewa",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Banyak penyewaan seluruhnya sama pada keempat akhir pekan.",
        },
        {
          column: 1,
          label:
            "Pendapatan sewa pada akhir pekan ke-$$4$$ lebih dari $$30\\%$$ lebih tinggi daripada pendapatan pada akhir pekan ke-$$1$$.",
        },
        {
          column: 1,
          label:
            "Rata-rata penyewaan sepeda listrik per akhir pekan adalah $$51{,}25$$.",
        },
        {
          column: 2,
          label:
            "Selama empat akhir pekan, pendapatan dari sepeda biasa lebih besar daripada pendapatan dari sepeda listrik.",
        },
      ],
    },
  },
};

export default item;
