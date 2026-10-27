import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\text{Rp}4{.}800{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}3{.}800{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}4{.}200{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}5{.}000{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}5{.}200{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
