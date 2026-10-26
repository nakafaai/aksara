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
          correct: true,
          label: "$$\\text{Rp }27{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }22{.}500$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }24{.}750$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }29{.}250$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }31{.}500$$",
        },
      ],
    },
  },
  stimulus: "stationery-bundles",
};

export default item;
