import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}24{.}000$$" },
        { correct: false, label: "$$\\text{Rp}33{.}000$$" },
        { correct: false, label: "$$\\text{Rp}38{.}000$$" },
        { correct: false, label: "$$\\text{Rp}47{.}000$$" },
        { correct: true, label: "$$\\text{Rp}56{.}000$$" },
      ],
    },
  },
};

export default item;
