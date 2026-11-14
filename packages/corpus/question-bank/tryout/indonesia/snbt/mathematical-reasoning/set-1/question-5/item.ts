import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "courier-rates",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}107{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}155{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}167{.}000{,}00$$" },
        { correct: true, label: "$$\\text{Rp}179{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}202{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
