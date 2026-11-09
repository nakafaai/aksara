import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "bus-route",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\text{Rp}141{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}175{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}264{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}282{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}330{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
