import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}4{.}800{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}5{.}900{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}5{.}200{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}6{.}300{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}7{.}200{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
