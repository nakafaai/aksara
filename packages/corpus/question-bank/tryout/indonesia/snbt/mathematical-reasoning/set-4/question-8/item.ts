import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "cake-recipe",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}36{.}500{,}00$$" },
        { correct: false, label: "$$\\text{Rp}37{.}500{,}00$$" },
        { correct: true, label: "$$\\text{Rp}38{.}500{,}00$$" },
        { correct: false, label: "$$\\text{Rp}40{.}500{,}00$$" },
        { correct: false, label: "$$\\text{Rp}45{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
