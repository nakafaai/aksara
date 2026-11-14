import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "shuttle-trips",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}475{.}000{,}00$$" },
        { correct: true, label: "$$\\text{Rp}495{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}515{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}520{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}560{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
