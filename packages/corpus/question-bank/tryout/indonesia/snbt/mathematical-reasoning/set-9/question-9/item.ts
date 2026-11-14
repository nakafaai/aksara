import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "pension-savings",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}85{.}470{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}91{.}000{.}000{,}00$$" },
        { correct: true, label: "$$\\text{Rp}94{.}024{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}100{.}740{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}112{.}770{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
