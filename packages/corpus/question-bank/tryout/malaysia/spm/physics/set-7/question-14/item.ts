import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$1.0\\text{ m}$$ and $$0.67\\text{ m}$$" },
        { correct: false, label: "$$2.0\\text{ m}$$ and $$1.3\\text{ m}$$" },
        { correct: false, label: "$$1.0\\text{ m}$$ and $$1.5\\text{ m}$$" },
        { correct: false, label: "$$0.50\\text{ m}$$ and $$0.33\\text{ m}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$1.0\\text{ m}$$ dan $$0.67\\text{ m}$$" },
        { correct: false, label: "$$2.0\\text{ m}$$ dan $$1.3\\text{ m}$$" },
        { correct: false, label: "$$1.0\\text{ m}$$ dan $$1.5\\text{ m}$$" },
        { correct: false, label: "$$0.50\\text{ m}$$ dan $$0.33\\text{ m}$$" },
      ],
    },
  },
};

export default item;
