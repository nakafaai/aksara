import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "nuclear-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2.1 \\times 10^9$$ years, and $$15$$" },
        { correct: true, label: "$$1.4 \\times 10^9$$ years, and $$7$$" },
        { correct: false, label: "$$1.4 \\times 10^9$$ years, and $$6$$" },
        { correct: false, label: "$$1.1 \\times 10^9$$ years, and $$5$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2.1 \\times 10^9$$ tahun, dan $$15$$" },
        { correct: true, label: "$$1.4 \\times 10^9$$ tahun, dan $$7$$" },
        { correct: false, label: "$$1.4 \\times 10^9$$ tahun, dan $$6$$" },
        { correct: false, label: "$$1.1 \\times 10^9$$ tahun, dan $$5$$" },
      ],
    },
  },
};

export default item;
