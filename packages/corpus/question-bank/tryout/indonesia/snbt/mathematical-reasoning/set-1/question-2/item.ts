import type { ItemSource } from "#corpus/question-bank/item";

// Date: 2025-11-23
const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}95{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}96{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}98{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}99{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}97{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
