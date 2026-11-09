import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "store-promo",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}200{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}223{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}250{.}000$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}278{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}286{.}000$$",
        },
      ],
    },
  },
};

export default item;
