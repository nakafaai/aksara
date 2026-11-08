import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "money-changer",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}3{.}455{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}3{.}480{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}3{.}505{.}000{,}00$$" },
        { correct: true, label: "$$\\text{Rp}3{.}565{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}3{.}590{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
