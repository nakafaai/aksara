import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "loyalty-card",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}480{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}500{.}000{,}00$$" },
        { correct: true, label: "$$\\text{Rp}505{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}520{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}540{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
