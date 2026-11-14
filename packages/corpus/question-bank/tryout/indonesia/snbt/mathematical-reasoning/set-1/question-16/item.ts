import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "arena-seats",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}188{.}700{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}199{.}200{.}000{,}00$$" },
        { correct: true, label: "$$\\text{Rp}203{.}100{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}207{.}200{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}229{.}350{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
