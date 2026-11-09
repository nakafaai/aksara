import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "dice-game",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}36{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}45{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}54{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}72{.}000{,}00$$" },
        { correct: true, label: "$$\\text{Rp}90{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
