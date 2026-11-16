import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}170{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}199{.}500$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}230{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}240{.}000$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}266{.}000$$",
        },
      ],
    },
  },
};

export default item;
