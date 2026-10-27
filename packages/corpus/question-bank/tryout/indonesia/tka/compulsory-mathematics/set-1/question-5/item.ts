import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  stimulus: "stationery-bundles",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp }1{.}500$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }2{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }2{.}500$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp }2{.}250$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }3{.}000$$",
        },
      ],
    },
  },
};

export default item;
