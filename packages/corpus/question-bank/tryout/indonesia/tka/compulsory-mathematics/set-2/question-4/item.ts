import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}37{.}500$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}43{.}500$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}46{.}500$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}49{.}500$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}52{.}500$$",
        },
      ],
    },
  },
};

export default item;
