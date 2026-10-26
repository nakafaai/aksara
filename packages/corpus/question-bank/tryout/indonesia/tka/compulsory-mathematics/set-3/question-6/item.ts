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
          label: "$$\\text{Rp }125{.}000$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp }145{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }135{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }155{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp }165{.}000$$",
        },
      ],
    },
  },
  stimulus: "courier-prices",
};

export default item;
