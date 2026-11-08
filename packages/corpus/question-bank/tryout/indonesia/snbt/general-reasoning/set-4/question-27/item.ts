import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "quantitative-reasoning",
    topic: "ratio",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}20{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}30{.}000$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}60{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}80{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}100{.}000$$",
        },
      ],
    },
  },
};

export default item;
