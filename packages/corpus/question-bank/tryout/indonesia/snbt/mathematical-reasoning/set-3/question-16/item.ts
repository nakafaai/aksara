import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}2{.}400{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}3{.}000{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}3{.}600{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}9{.}000{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}6{.}000{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
