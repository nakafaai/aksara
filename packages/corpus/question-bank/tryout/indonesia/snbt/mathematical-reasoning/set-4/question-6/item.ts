import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "cake-recipe",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}1{.}000{,}00$$" },
        { correct: true, label: "$$\\text{Rp}1{.}250{,}00$$" },
        { correct: false, label: "$$\\text{Rp}1{.}500{,}00$$" },
        { correct: false, label: "$$\\text{Rp}1{.}750{,}00$$" },
        { correct: false, label: "$$\\text{Rp}15{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
