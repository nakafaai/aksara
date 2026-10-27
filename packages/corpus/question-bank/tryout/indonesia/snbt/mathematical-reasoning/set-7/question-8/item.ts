import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}4{.}680{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}5{.}000{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}4{.}700{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}5{.}200{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}5{.}600{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
