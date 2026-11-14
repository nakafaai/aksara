import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "shuttle-trips",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}325{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}345{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}365{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}390{.}000{,}00$$" },
        { correct: true, label: "$$\\text{Rp}410{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
