import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "panen",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Hasil panen keempat kelompok seluruhnya adalah $$271$$ ton.",
        },
        {
          column: 2,
          label:
            "Produktivitas kelompok A lebih tinggi daripada produktivitas gabungan keempat kelompok.",
        },
        {
          column: 2,
          label:
            "Luas lahan kelompok D adalah $$25\\%$$ dari luas lahan seluruhnya.",
        },
        {
          column: 1,
          label:
            "Produktivitas gabungan keempat kelompok lebih dari $$6$$ ton per hektare.",
        },
      ],
    },
  },
};

export default item;
