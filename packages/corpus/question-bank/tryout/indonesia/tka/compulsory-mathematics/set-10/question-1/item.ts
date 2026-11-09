import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
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
          label: "$$\\text{Rp}175{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}180{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}190{.}000$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}195{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}200{.}000$$",
        },
      ],
    },
  },
};

export default item;
