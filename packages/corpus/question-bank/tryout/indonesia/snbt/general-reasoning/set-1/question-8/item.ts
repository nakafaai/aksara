import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}40{.}000{.}000{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}50{.}000{.}000{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}60{.}000{.}000{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}70{.}000{.}000{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}80{.}000{.}000{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
