import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "matrices",
  },
  stimulus: "batik-studio",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}2{.}000{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}2{.}360{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}2{.}080{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}2{.}600{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}3{.}200{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
