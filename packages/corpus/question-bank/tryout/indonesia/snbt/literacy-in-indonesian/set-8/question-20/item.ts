import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "household-spending",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Rp$$180{.}000$$, yaitu $$20\\%$$ dari seluruh pengeluaran",
        },
        {
          correct: false,
          label: "Rp$$104{.}400$$, yaitu $$20\\%$$ dari pengeluaran makanan",
        },
        {
          correct: true,
          label: "Rp$$27{.}000$$, yaitu $$20\\%$$ dari pengeluaran beras",
        },
        {
          correct: false,
          label: "Rp$$135{.}000$$, yaitu seluruh pengeluaran beras",
        },
        {
          correct: false,
          label: "Rp$$21{.}600$$, sama dengan tambahan biaya kelompok terbawah",
        },
      ],
    },
  },
};

export default item;
