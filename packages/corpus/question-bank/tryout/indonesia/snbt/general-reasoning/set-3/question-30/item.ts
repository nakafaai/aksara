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
          label: "$$\\text{Rp}855{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}877{.}500$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}892{.}500$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}900{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}943{.}500$$",
        },
      ],
    },
  },
};

export default item;
