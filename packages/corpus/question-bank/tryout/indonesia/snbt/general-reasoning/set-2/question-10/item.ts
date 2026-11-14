import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "letter-number-pattern",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{F}129$$",
        },
        {
          correct: false,
          label: "$$\\text{L}33$$",
        },
        {
          correct: false,
          label: "$$\\text{O}65$$",
        },
        {
          correct: true,
          label: "$$\\text{S}65$$",
        },
        {
          correct: false,
          label: "$$\\text{T}68$$",
        },
      ],
    },
  },
};

export default item;
