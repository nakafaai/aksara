import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "temperature-scales",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$66{,}6^\\circ\\text{F}$$" },
        { correct: true, label: "$$98{,}6^\\circ\\text{F}$$" },
        { correct: false, label: "$$99{,}6^\\circ\\text{F}$$" },
        { correct: false, label: "$$124{,}2^\\circ\\text{F}$$" },
        { correct: false, label: "$$130{,}6^\\circ\\text{F}$$" },
      ],
    },
  },
};

export default item;
