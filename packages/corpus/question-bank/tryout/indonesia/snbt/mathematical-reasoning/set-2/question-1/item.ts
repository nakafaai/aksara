import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "ride-fare",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}22{.}500{,}00$$" },
        { correct: false, label: "$$\\text{Rp}23{.}250{,}00$$" },
        { correct: true, label: "$$\\text{Rp}25{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}27{.}500{,}00$$" },
        { correct: false, label: "$$\\text{Rp}30{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
