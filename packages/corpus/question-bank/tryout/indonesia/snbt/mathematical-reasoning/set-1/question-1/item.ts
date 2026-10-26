import type { ItemSource } from "#corpus/question-bank/item";

// Date: 2025-11-23
const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}4{.}400{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}4{.}560{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}4{.}720{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}4{.}640{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}4{.}800{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
