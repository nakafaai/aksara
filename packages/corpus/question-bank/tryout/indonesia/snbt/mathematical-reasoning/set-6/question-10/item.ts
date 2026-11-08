import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "parcel-weight",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}67{.}500{,}00$$" },
        { correct: false, label: "$$\\text{Rp}72{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}81{.}000{,}00$$" },
        { correct: true, label: "$$\\text{Rp}90{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}99{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
