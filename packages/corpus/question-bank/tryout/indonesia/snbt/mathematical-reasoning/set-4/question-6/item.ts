import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp }8{.}100{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp }9{.}300{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }10{.}200{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }10{.}500{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }12{.}100{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
