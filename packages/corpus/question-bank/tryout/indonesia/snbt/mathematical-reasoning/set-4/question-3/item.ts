import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}2{.}500{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}3{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}4{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}5{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}5{.}500{,}00$$",
        },
      ],
    },
  },
};

export default item;
