import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "deductive-reasoning",
    topic: "rule-application",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}44{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}48{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}50{.}000$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}52{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}55{.}000$$",
        },
      ],
    },
  },
};

export default item;
