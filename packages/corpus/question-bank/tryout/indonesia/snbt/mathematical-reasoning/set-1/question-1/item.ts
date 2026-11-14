import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "home-battery",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}22{.}500{,}00$$" },
        { correct: true, label: "$$\\text{Rp}21{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}20{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}17{.}500{,}00$$" },
        { correct: false, label: "$$\\text{Rp}1{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
