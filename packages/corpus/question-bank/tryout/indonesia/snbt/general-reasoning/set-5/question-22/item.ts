import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "weighted-average",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$70{,}4$$" },
        { correct: false, label: "$$69{,}2$$" },
        { correct: false, label: "$$69$$" },
        { correct: true, label: "$$68$$" },
        { correct: false, label: "$$60{,}8$$" },
      ],
    },
  },
};

export default item;
