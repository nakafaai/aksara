import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "tiered-rate",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pemakaian $$18$$ m³ dalam sebulan ditagih $$\\text{Rp}63{.}000$$.",
        },
        {
          column: 2,
          label:
            "Untuk pemakaian $$25$$ m³, rata-rata biaya per m³ (termasuk biaya beban) kurang dari $$\\text{Rp}3{.}500$$.",
        },
        {
          column: 1,
          label:
            "Tagihan untuk pemakaian $$20$$ m³ tepat dua kali tagihan untuk pemakaian $$10$$ m³.",
        },
        {
          column: 2,
          label:
            "Pelanggan dengan tagihan $$\\text{Rp}50{.}000$$ memakai lebih dari $$15$$ m³ air.",
        },
      ],
    },
  },
};

export default item;
