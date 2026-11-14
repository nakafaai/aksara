import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "car-rental",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}1{.}824{.}000$$" },
        { correct: true, label: "$$\\text{Rp}1{.}860{.}000$$" },
        { correct: false, label: "$$\\text{Rp}2{.}000{.}000$$" },
        { correct: false, label: "$$\\text{Rp}2{.}280{.}000$$" },
        { correct: false, label: "$$\\text{Rp}2{.}400{.}000$$" },
      ],
    },
  },
};

export default item;
