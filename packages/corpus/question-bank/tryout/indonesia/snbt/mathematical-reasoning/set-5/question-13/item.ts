import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp }394{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }375{.}500{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }390{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }425{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp }374{.}300{,}00$$",
        },
      ],
    },
  },
};

export default item;
