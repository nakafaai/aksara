import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "pension-savings",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}12{.}000{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}13{.}500{.}000{,}00$$" },
        { correct: true, label: "$$\\text{Rp}14{.}000{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}15{.}500{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}21{.}000{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
