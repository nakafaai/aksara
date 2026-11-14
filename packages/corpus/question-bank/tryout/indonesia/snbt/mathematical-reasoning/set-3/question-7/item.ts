import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "library-fines",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}135{.}000{,}00$$" },
        { correct: true, label: "$$\\text{Rp}156{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}160{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}162{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}207{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
