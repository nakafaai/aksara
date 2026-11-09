import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "electricity-tariff",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}270{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}325{.}000{,}00$$" },
        { correct: true, label: "$$\\text{Rp}345{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}395{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}520{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
