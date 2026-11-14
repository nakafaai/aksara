import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "cinema-pricing",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}3{.}880{.}000$$" },
        { correct: false, label: "$$\\text{Rp}5{.}000{.}000$$" },
        { correct: false, label: "$$\\text{Rp}5{.}480{.}000$$" },
        { correct: true, label: "$$\\text{Rp}5{.}560{.}000$$" },
        { correct: false, label: "$$\\text{Rp}5{.}600{.}000$$" },
      ],
    },
  },
};

export default item;
