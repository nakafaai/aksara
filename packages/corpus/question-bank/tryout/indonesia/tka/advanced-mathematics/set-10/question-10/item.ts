import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
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
          label:
            "Keuntungan dari penjualan $$100$$ tas adalah $$\\text{Rp}2{.}000{.}000{,}00$$.",
        },
        {
          column: 1,
          label:
            "Usaha itu tidak untung dan tidak rugi tepat ketika terjual $$50$$ tas.",
        },
        {
          column: 2,
          label:
            "Fungsi keuntungannya adalah $$P(x)=140{.}000x-2{.}000{.}000$$.",
        },
        {
          column: 2,
          label:
            "Setiap tambahan satu tas yang terjual menambah keuntungan sebesar $$\\text{Rp}90{.}000{,}00$$.",
        },
      ],
    },
  },
};

export default item;
