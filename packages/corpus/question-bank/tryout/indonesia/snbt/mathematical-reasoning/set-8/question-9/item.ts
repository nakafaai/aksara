import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "orchard-yield",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\text{Rp}33{.}408{.}000$$" },
        { correct: false, label: "$$\\text{Rp}33{.}696{.}000$$" },
        { correct: false, label: "$$\\text{Rp}34{.}320{.}000$$" },
        { correct: false, label: "$$\\text{Rp}35{.}328{.}000$$" },
        { correct: false, label: "$$\\text{Rp}38{.}976{.}000$$" },
      ],
    },
  },
};

export default item;
