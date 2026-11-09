import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "floor-tiles",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Ubin 30 cm lebih murah $$\\text{Rp}348{.}000{,}00$$.",
        },
        {
          correct: false,
          label: "Ubin 30 cm lebih murah $$\\text{Rp}238{.}000{,}00$$.",
        },
        { correct: false, label: "Biaya kedua pilihan sama." },
        {
          correct: false,
          label: "Ubin 45 cm lebih murah $$\\text{Rp}88{.}000{,}00$$.",
        },
        {
          correct: false,
          label: "Ubin 45 cm lebih murah $$\\text{Rp}348{.}000{,}00$$.",
        },
      ],
    },
  },
};

export default item;
