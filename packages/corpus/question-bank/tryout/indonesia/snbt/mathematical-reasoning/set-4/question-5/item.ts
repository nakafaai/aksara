import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "fish-pond",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\text{Rp}1{.}872{.}000$$" },
        { correct: false, label: "$$\\text{Rp}2{.}160{.}000$$" },
        { correct: false, label: "$$\\text{Rp}2{.}400{.}000$$" },
        { correct: false, label: "$$\\text{Rp}2{.}736{.}000$$" },
        { correct: false, label: "$$\\text{Rp}3{.}744{.}000$$" },
      ],
    },
  },
};

export default item;
