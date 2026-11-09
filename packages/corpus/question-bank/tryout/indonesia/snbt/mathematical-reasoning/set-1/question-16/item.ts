import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "data-plans",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}69{.}000{,}00$$" },
        { correct: true, label: "$$\\text{Rp}96{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}104{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}122{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}316{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
