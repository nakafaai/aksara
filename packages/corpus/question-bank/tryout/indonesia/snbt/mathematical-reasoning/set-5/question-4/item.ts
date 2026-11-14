import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "gym-plans",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}500{.}000$$" },
        { correct: false, label: "$$\\text{Rp}540{.}000$$" },
        { correct: true, label: "$$\\text{Rp}580{.}000$$" },
        { correct: false, label: "$$\\text{Rp}610{.}000$$" },
        { correct: false, label: "$$\\text{Rp}650{.}000$$" },
      ],
    },
  },
};

export default item;
