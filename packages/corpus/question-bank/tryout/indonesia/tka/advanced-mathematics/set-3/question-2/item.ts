import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "matrices",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Pendapatan hari Sabtu, yaitu $$\\text{Rp}430{.}000{,}00$$",
        },
        {
          correct: false,
          label: "Pendapatan hari Minggu, yaitu $$\\text{Rp}450{.}000{,}00$$",
        },
        {
          correct: false,
          label: "Banyak barang yang terjual hari Minggu, yaitu $$22$$ buah",
        },
        {
          correct: false,
          label:
            "Pendapatan dari buku tulis selama dua hari, yaitu $$\\text{Rp}340{.}000{,}00$$",
        },
        {
          correct: true,
          label: "Pendapatan hari Minggu, yaitu $$\\text{Rp}430{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
