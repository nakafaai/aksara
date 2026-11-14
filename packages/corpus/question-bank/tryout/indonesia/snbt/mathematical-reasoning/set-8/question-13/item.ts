import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "carpool-cost",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}44{.}600$$" },
        { correct: false, label: "$$\\text{Rp}49{.}900$$" },
        { correct: false, label: "$$\\text{Rp}51{.}100$$" },
        { correct: false, label: "$$\\text{Rp}53{.}800$$" },
        { correct: true, label: "$$\\text{Rp}55{.}100$$" },
      ],
    },
  },
};

export default item;
