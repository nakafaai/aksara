import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "cooking-gas",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}1{.}260{.}000$$" },
        { correct: true, label: "$$\\text{Rp}1{.}064{.}000$$" },
        { correct: false, label: "$$\\text{Rp}1{.}036{.}000$$" },
        { correct: false, label: "$$\\text{Rp}980{.}000$$" },
        { correct: false, label: "$$\\text{Rp}840{.}000$$" },
      ],
    },
  },
};

export default item;
