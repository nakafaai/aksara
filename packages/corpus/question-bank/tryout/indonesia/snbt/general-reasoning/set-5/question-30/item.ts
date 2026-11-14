import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "optimization",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\text{Rp}168{.}000$$" },
        { correct: false, label: "$$\\text{Rp}178{.}000$$" },
        { correct: false, label: "$$\\text{Rp}184{.}000$$" },
        { correct: false, label: "$$\\text{Rp}192{.}000$$" },
        { correct: false, label: "$$\\text{Rp}204{.}000$$" },
      ],
    },
  },
};

export default item;
