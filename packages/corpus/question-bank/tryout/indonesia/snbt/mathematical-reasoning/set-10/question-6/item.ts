import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "phone-installment",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}6{.}232{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}6{.}560{.}000{,}00$$" },
        { correct: true, label: "$$\\text{Rp}6{.}644{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}6{.}704{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}7{.}163{.}120{,}00$$" },
      ],
    },
  },
};

export default item;
