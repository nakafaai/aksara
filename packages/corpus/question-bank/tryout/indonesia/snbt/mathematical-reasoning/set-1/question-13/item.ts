import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "arena-seats",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\text{Rp}95{.}000{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}93{.}300{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}92{.}800{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}91{.}100{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}90{.}600{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
