import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "download-quota",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}0$$" },
        { correct: true, label: "$$\\text{Rp}15{.}000$$" },
        { correct: false, label: "$$\\text{Rp}30{.}000$$" },
        { correct: false, label: "$$\\text{Rp}45{.}000$$" },
        { correct: false, label: "$$\\text{Rp}60{.}000$$" },
      ],
    },
  },
};

export default item;
