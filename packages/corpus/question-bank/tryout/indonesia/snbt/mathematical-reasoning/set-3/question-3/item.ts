import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\text{Rp}250{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}275{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}425{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}460{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}500{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
