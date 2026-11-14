import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "liquid-fertilizer",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}504{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}528{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}546{.}000$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}552{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}588{.}000$$",
        },
      ],
    },
  },
};

export default item;
