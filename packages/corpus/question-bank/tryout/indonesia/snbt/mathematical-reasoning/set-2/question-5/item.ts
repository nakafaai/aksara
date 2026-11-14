import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "paint-mixing",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}905{.}000{,}00$$" },
        { correct: true, label: "$$\\text{Rp}945{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}990{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}1{.}010{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}1{.}280{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
