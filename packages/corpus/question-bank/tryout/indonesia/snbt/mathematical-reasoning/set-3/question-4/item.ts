import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "parking-fees",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}4{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}8{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}10{.}000{,}00$$" },
        { correct: true, label: "$$\\text{Rp}14{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}18{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
