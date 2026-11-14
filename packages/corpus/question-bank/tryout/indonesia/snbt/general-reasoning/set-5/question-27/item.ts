import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "calendar-cycle",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$5$$ kali" },
        { correct: true, label: "$$6$$ kali" },
        { correct: false, label: "$$7$$ kali" },
        { correct: false, label: "$$20$$ kali" },
        { correct: false, label: "$$27$$ kali" },
      ],
    },
  },
};

export default item;
