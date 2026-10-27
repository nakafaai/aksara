import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp }15{.}000{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }15{.}600{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }17{.}200{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp }16{.}000{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }18{.}600{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
