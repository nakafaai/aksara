import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "coffee-roast",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\text{Rp}3{.}866{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}3{.}986{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}4{.}003{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}4{.}140{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}4{.}270{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
