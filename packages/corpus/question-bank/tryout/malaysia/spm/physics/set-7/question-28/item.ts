import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2.0\\text{ A}$$ and $$2.7\\text{ W}$$" },
        { correct: false, label: "$$1.2\\text{ A}$$ and $$24\\text{ W}$$" },
        { correct: false, label: "$$1.2\\text{ A}$$ and $$2.7\\text{ W}$$" },
        { correct: true, label: "$$1.2\\text{ A}$$ and $$8.6\\text{ W}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2.0\\text{ A}$$ dan $$2.7\\text{ W}$$" },
        { correct: false, label: "$$1.2\\text{ A}$$ dan $$24\\text{ W}$$" },
        { correct: false, label: "$$1.2\\text{ A}$$ dan $$2.7\\text{ W}$$" },
        { correct: true, label: "$$1.2\\text{ A}$$ dan $$8.6\\text{ W}$$" },
      ],
    },
  },
};

export default item;
