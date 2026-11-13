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
        { correct: false, label: "pukul $$17.24$$" },
        { correct: false, label: "pukul $$19.24$$" },
        { correct: true, label: "pukul $$20.24$$" },
        { correct: false, label: "pukul $$20.40$$" },
        { correct: false, label: "pukul $$21.24$$" },
      ],
    },
  },
};

export default item;
