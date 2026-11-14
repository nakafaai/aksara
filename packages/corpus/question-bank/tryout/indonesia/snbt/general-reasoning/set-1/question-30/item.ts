import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "optimization",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}6{.}650{.}000$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}6{.}850{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}7{.}250{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}8{.}400{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}8{.}750{.}000$$",
        },
      ],
    },
  },
};

export default item;
