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
          label: "$$\\text{Rp}94{.}000$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}100{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}125{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}135{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}150{.}000$$",
        },
      ],
    },
  },
};

export default item;
