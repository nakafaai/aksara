import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\text{Rp}360{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}120{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}180{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}380{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}420{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
