import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "kuota",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$27$$ GB" },
        { correct: true, label: "$$29$$ GB" },
        { correct: false, label: "$$30$$ GB" },
        { correct: false, label: "$$33$$ GB" },
        { correct: false, label: "$$45$$ GB" },
      ],
    },
  },
};

export default item;
