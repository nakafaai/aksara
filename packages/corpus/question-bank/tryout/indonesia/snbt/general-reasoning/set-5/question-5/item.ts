import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "inductive-reasoning",
    topic: "data-comparison",
  },
  stimulus: "bus",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pada April, penumpang pukul 05.00 sampai 06.30 lebih dari $$15\\%$$ dari jumlah penumpang harian.",
        },
        {
          column: 1,
          label:
            "Pendapatan tiket harian pada April lebih rendah daripada pendapatan tiket harian pada Februari.",
        },
        {
          column: 2,
          label:
            "Penumpang pukul 06.30 sampai 08.00 turun lebih dari $$25\\%$$ dari Februari ke April.",
        },
        {
          column: 2,
          label:
            "Pada April, rata-rata tarif yang dibayar per penumpang lebih dari $$\\text{Rp}3{.}700$$.",
        },
      ],
    },
  },
};

export default item;
