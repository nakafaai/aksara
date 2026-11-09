import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "parcel-weight",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}9{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}18{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}27{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}36{.}000{,}00$$" },
        { correct: true, label: "$$\\text{Rp}45{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
