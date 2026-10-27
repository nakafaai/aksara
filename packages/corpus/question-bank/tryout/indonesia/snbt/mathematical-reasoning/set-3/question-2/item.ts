import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}125{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}135{.}650{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}155{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}160{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}165{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
