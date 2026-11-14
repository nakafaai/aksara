import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "ferry-crossing",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\text{Rp}1{.}250{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}1{.}700{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}1{.}900{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}2{.}100{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}2{.}200{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
