import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "school-canteen",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "Turun $$\\text{Rp}195{.}000{,}00$$" },
        { correct: false, label: "Turun $$\\text{Rp}265{.}000{,}00$$" },
        { correct: false, label: "Turun $$\\text{Rp}335{.}000{,}00$$" },
        { correct: false, label: "Turun $$\\text{Rp}680{.}000{,}00$$" },
        { correct: false, label: "Turun $$\\text{Rp}750{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
