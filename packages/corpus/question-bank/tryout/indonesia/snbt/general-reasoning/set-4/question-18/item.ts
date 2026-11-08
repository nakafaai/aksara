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
          label: "$$\\text{Rp}58{.}500$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}66{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}72{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}76{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}82{.}000$$",
        },
      ],
    },
  },
};

export default item;
