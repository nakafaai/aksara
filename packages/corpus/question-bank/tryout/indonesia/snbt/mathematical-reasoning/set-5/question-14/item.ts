import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp }10{.}500{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }10{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp }9{.}500{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }9{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }8{.}500{,}00$$",
        },
      ],
    },
  },
};

export default item;
