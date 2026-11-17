import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "force-and-motion-1",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$180\\text{ m}$$ and $$12\\text{ s}$$" },
        { correct: false, label: "$$270\\text{ m}$$ and $$15\\text{ s}$$" },
        { correct: true, label: "$$270\\text{ m}$$ and $$16\\text{ s}$$" },
        { correct: false, label: "$$270\\text{ m}$$ and $$9.0\\text{ s}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$180\\text{ m}$$ dan $$12\\text{ s}$$" },
        { correct: false, label: "$$270\\text{ m}$$ dan $$15\\text{ s}$$" },
        { correct: true, label: "$$270\\text{ m}$$ dan $$16\\text{ s}$$" },
        { correct: false, label: "$$270\\text{ m}$$ dan $$9.0\\text{ s}$$" },
      ],
    },
  },
};

export default item;
