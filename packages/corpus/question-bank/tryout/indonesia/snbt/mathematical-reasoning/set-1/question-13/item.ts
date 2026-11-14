import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "data-plans",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Paket Hemat lebih murah $$\\text{Rp}18{.}000{,}00$$.",
        },
        {
          correct: false,
          label: "Paket Hemat lebih murah $$\\text{Rp}27{.}000{,}00$$.",
        },
        { correct: false, label: "Biaya kedua paket sama." },
        {
          correct: false,
          label: "Paket Bebas lebih murah $$\\text{Rp}18{.}000{,}00$$.",
        },
        {
          correct: false,
          label: "Paket Bebas lebih murah $$\\text{Rp}12{.}000{,}00$$.",
        },
      ],
    },
  },
};

export default item;
