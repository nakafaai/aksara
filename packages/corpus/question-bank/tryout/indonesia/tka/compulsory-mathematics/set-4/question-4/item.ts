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
          label: "$$\\text{Rp}9{.}500$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}27{.}350$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}28{.}385$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}28{.}500$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}29{.}500$$",
        },
      ],
    },
  },
};

export default item;
