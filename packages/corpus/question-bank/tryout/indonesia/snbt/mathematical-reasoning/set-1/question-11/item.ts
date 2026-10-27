import type { ItemSource } from "#corpus/question-bank/item";

// Date: 2025-11-23
const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\text{Rp}3{.}600{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}3{.}000{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}3{.}200{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}3{.}400{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}3{.}800{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
