import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "matrices",
  },
  stimulus: "print-shop",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\text{Rp}3{.}000{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}2{.}800{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}2{.}200{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}3{.}200{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}2{.}400{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
