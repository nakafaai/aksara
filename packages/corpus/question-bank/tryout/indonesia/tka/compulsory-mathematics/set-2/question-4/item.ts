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
          label: "$$\\text{Rp}8{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}9{.}000$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}10{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}11{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}12{.}000$$",
        },
      ],
    },
  },
};

export default item;
