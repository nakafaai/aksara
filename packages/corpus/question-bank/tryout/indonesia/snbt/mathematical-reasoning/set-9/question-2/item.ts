import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "phone-credit",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\text{Rp}691{.}200{,}00$$" },
        { correct: false, label: "$$\\text{Rp}720{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}864{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}1{.}411{.}200{,}00$$" },
        { correct: false, label: "$$\\text{Rp}1{.}584{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
