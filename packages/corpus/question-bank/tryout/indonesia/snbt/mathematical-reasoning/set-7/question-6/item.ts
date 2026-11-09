import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "dice-game",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}1{.}500{,}00$$" },
        { correct: false, label: "$$\\text{Rp}2{.}500{,}00$$" },
        { correct: true, label: "$$\\text{Rp}3{.}500{,}00$$" },
        { correct: false, label: "$$\\text{Rp}4{.}500{,}00$$" },
        { correct: false, label: "$$\\text{Rp}21{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
