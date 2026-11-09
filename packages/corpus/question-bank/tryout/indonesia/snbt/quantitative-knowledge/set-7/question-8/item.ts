import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}1{.}000{.}000{,}00$$" },
        { correct: true, label: "$$\\text{Rp}1{.}100{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}1{.}150{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}1{.}200{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}1{.}250{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
