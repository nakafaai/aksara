import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "transport-in-humans-and-animals",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.3\\text{ s}$$ and $$0.4\\text{ s}$$" },
        { correct: true, label: "$$0.2\\text{ s}$$ and $$0.5\\text{ s}$$" },
        { correct: false, label: "$$0.1\\text{ s}$$ and $$0.6\\text{ s}$$" },
        { correct: false, label: "$$0.2\\text{ s}$$ and $$0.6\\text{ s}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.3\\text{ s}$$ dan $$0.4\\text{ s}$$" },
        { correct: true, label: "$$0.2\\text{ s}$$ dan $$0.5\\text{ s}$$" },
        { correct: false, label: "$$0.1\\text{ s}$$ dan $$0.6\\text{ s}$$" },
        { correct: false, label: "$$0.2\\text{ s}$$ dan $$0.6\\text{ s}$$" },
      ],
    },
  },
};

export default item;
