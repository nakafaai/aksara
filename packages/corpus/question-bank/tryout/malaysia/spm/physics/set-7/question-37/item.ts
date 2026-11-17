import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$3$$, $$1$$ and $$1$$" },
        { correct: false, label: "$$3$$, $$0$$ and $$1$$" },
        { correct: false, label: "$$6$$, $$1$$ and $$2$$" },
        { correct: false, label: "$$2$$, $$1$$ and $$1$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$3$$, $$1$$ dan $$1$$" },
        { correct: false, label: "$$3$$, $$0$$ dan $$1$$" },
        { correct: false, label: "$$6$$, $$1$$ dan $$2$$" },
        { correct: false, label: "$$2$$, $$1$$ dan $$1$$" },
      ],
    },
  },
};

export default item;
