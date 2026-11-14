import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "coffee-roast",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}30{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}66{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}86{.}000{,}00$$" },
        { correct: true, label: "$$\\text{Rp}96{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}100{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
