import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "fish-pond",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}9{.}320{.}000$$" },
        { correct: true, label: "$$\\text{Rp}9{.}400{.}000$$" },
        { correct: false, label: "$$\\text{Rp}10{.}400{.}000$$" },
        { correct: false, label: "$$\\text{Rp}14{.}120{.}000$$" },
        { correct: false, label: "$$\\text{Rp}20{.}660{.}000$$" },
      ],
    },
  },
};

export default item;
