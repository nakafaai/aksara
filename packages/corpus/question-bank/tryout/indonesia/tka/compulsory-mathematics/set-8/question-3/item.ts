import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "overtime-pay",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Upah satu jam lembur sama dengan upah $$1$$ jam $$30$$ menit kerja biasa.",
        },
        {
          column: 1,
          label:
            "Upah kotor untuk $$48$$ jam kerja dalam seminggu lebih dari $$1{,}2$$ kali upah kotor untuk $$40$$ jam kerja.",
        },
        {
          column: 2,
          label:
            "Jika upah per jam biasa naik $$10\\,\\%$$, upah kotor untuk $$44$$ jam kerja dalam seminggu naik lebih dari $$10\\,\\%$$.",
        },
        {
          column: 2,
          label:
            "Iuran yang dipotong dari upah untuk $$50$$ jam kerja dalam seminggu lebih dari $$\\text{Rp}30{.}000$$.",
        },
      ],
    },
  },
};

export default item;
